"use server";

import { headers } from "next/headers";

// Rate limiting: Simple in-memory store (use Redis in production for distributed systems)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 requests per minute per IP
const DISCORD_FETCH_TIMEOUT = 10000; // 10 seconds timeout
const DISCORD_FIELD_MAX_LENGTH = 1024; // Discord embed field value limit
const DISCORD_EMBED_TOTAL_MAX = 6000; // Discord embed total character limit

// Input validation helpers
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeString(value: string | null, maxLength: number = 500): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength ? trimmed : null;
}

// Sanitize Discord content - remove markdown and special characters that could be used for injection
function sanitizeDiscordContent(content: string, maxLength: number = DISCORD_FIELD_MAX_LENGTH): string {
  if (!content) return "Not provided";

  // Remove Discord markdown syntax
  let sanitized = content
    .replace(/[`*_~|]/g, "") // Remove markdown characters
    .replace(/@/g, "@\u200B") // Zero-width space to prevent mentions
    .replace(/<[^>]*>/g, "") // Remove HTML-like tags
    .trim();

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength - 3) + "...";
  }

  return sanitized || "Not provided";
}

// Rate limiting check
async function checkRateLimit(): Promise<{ allowed: boolean; error?: string }> {
  try {
    const headersList = await headers();
    // Try to get IP from various headers (in production, use a proper method)
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "unknown";

    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (record) {
      if (now < record.resetAt) {
        // Still in rate limit window
        if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
          return {
            allowed: false,
            error: "Too many requests. Please try again later.",
          };
        }
        record.count++;
      } else {
        // Reset window
        record.count = 1;
        record.resetAt = now + RATE_LIMIT_WINDOW;
      }
    } else {
      // First request from this IP
      rateLimitStore.set(ip, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW,
      });
    }

    // Clean up old entries periodically (simple cleanup)
    if (rateLimitStore.size > 1000) {
      for (const [key, value] of rateLimitStore.entries()) {
        if (now >= value.resetAt) {
          rateLimitStore.delete(key);
        }
      }
    }

    return { allowed: true };
  } catch (error) {
    // If rate limiting fails, allow the request but log it
    console.error("[submitMemberUpdateRequest] Rate limit check failed:", error);
    return { allowed: true };
  }
}

// Fetch with timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number = DISCORD_FETCH_TIMEOUT
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  }
}

export async function submitMemberUpdateRequest(
  id: number,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  // Rate limiting check
  const rateLimitCheck = await checkRateLimit();
  if (!rateLimitCheck.allowed) {
    return { success: false, error: rateLimitCheck.error };
  }

  // Validate ID
  if (!id || typeof id !== "number" || id <= 0 || id > 2147483647) {
    return { success: false, error: "Invalid member ID." };
  }

  // Add small random delay to prevent timing attacks (1-3 seconds)
  const delay = Math.floor(Math.random() * 2000) + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error("[submitMemberUpdateRequest] DISCORD_WEBHOOK_URL environment variable is not set");
    return { success: false, error: "Error on backend. Please try again later." };
  }

  // Validate webhook URL format
  try {
    new URL(webhookUrl);
  } catch {
    console.error("[submitMemberUpdateRequest] Invalid webhook URL format");
    return { success: false, error: "Error on backend. Please try again later." };
  }

  // Parse and validate required fields
  const name = sanitizeString(formData.get("name") as string, 200);
  const email = sanitizeString(formData.get("email") as string, 200);
  const membershipType = sanitizeString(formData.get("membershipType") as string, 50);

  if (!name || !email) {
    return { success: false, error: "Please fill in all required fields." };
  }

  if (!isValidEmail(email)) {
    return { success: false, error: "Please provide a valid email address." };
  }

  // Parse categories from form data with size limits
  const categoriesJson = formData.get("categories");
  let categories: string[] = [];
  if (categoriesJson) {
    try {
      // Limit JSON size to prevent large payloads
      const jsonStr = categoriesJson as string;
      if (jsonStr.length > 10000) {
        console.error("[submitMemberUpdateRequest] Categories JSON too large");
      } else {
        const parsed = JSON.parse(jsonStr);
        if (Array.isArray(parsed)) {
          // Limit number of categories and sanitize each
          categories = parsed
            .slice(0, 20) // Max 20 categories
            .filter((cat): cat is string => typeof cat === "string" && cat.length <= 100)
            .map((cat) => sanitizeDiscordContent(cat, 100));
        }
      }
    } catch (e) {
      console.error("[submitMemberUpdateRequest] Error parsing categories:", e);
    }
  }

  // Parse display_email checkbox
  const displayEmail = formData.get("displayEmail") === "on" || formData.get("displayEmail") === "true";

  // Parse zip code
  const zipValue = formData.get("zip");
  let zip: number | null = null;
  if (zipValue) {
    const parsed = parseInt(zipValue as string, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 99999) {
      zip = parsed;
    }
  }

  // Build address string with sanitized values
  const addressParts = [
    sanitizeString(formData.get("address") as string, 200),
    sanitizeString(formData.get("address2") as string, 200),
    sanitizeString(formData.get("city") as string, 100),
    sanitizeString(formData.get("state") as string, 50),
    zip ? zip.toString() : null,
  ].filter(Boolean) as string[];
  const fullAddress = addressParts.length > 0 ? addressParts.join(", ") : "Not provided";

  // Build Discord embed with sanitized content
  const embedFields = [
    {
      name: "Member ID",
      value: sanitizeDiscordContent(id.toString(), 20),
      inline: true,
    },
    {
      name: "Name",
      value: sanitizeDiscordContent(name || "Not provided", DISCORD_FIELD_MAX_LENGTH),
      inline: true,
    },
    {
      name: "Membership Type",
      value: sanitizeDiscordContent(membershipType || "Not provided", 50),
      inline: true,
    },
    {
      name: "Email",
      value: sanitizeDiscordContent(email || "Not provided", DISCORD_FIELD_MAX_LENGTH),
      inline: true,
    },
    {
      name: "Display Email in Directory",
      value: displayEmail ? "Yes" : "No",
      inline: true,
    },
    {
      name: "Firm",
      value: sanitizeDiscordContent(
        sanitizeString(formData.get("firm") as string, 200) || "Not provided",
        DISCORD_FIELD_MAX_LENGTH
      ),
      inline: true,
    },
    {
      name: "Address",
      value: sanitizeDiscordContent(fullAddress, DISCORD_FIELD_MAX_LENGTH),
      inline: false,
    },
    {
      name: "Phone",
      value: sanitizeDiscordContent(
        sanitizeString(formData.get("phone") as string, 50) || "Not provided",
        50
      ),
      inline: true,
    },
    {
      name: "Fax",
      value: sanitizeDiscordContent(
        sanitizeString(formData.get("fax") as string, 50) || "Not provided",
        50
      ),
      inline: true,
    },
    {
      name: "Website",
      value: sanitizeDiscordContent(
        sanitizeString(formData.get("website") as string, 500) || "Not provided",
        DISCORD_FIELD_MAX_LENGTH
      ),
      inline: true,
    },
    {
      name: "Practice Categories",
      value: categories.length > 0
        ? sanitizeDiscordContent(categories.join(", "), DISCORD_FIELD_MAX_LENGTH)
        : "None selected",
      inline: false,
    },
  ];

  // Validate total embed size (Discord limit is 6000 characters)
  const totalLength = JSON.stringify(embedFields).length;
  if (totalLength > DISCORD_EMBED_TOTAL_MAX) {
    console.error("[submitMemberUpdateRequest] Embed too large:", totalLength);
    return {
      success: false,
      error: "Request too large. Please reduce the amount of information.",
    };
  }

  const embed = {
    title: "📝 Member Information Update Request",
    color: 0xdc2626, // Red color matching the site theme
    fields: embedFields,
    timestamp: new Date().toISOString(),
    footer: {
      text: "Wayne County Bar Association",
    },
  };

  try {
    // Validate payload size before sending
    const payload = JSON.stringify({ embeds: [embed] });
    if (payload.length > 200000) {
      // Discord webhook payload limit is around 200KB
      console.error("[submitMemberUpdateRequest] Payload too large:", payload.length);
      return {
        success: false,
        error: "Request too large. Please try again with less information.",
      };
    }

    // Ensure webhook URL is Discord webhook URL
    if (!webhookUrl.includes("discord.com/api/webhooks")) {
      console.error("[submitMemberUpdateRequest] Invalid webhook URL domain");
      return {
        success: false,
        error: "Error on backend. Please try again later.",
      };
    }

    const response = await fetchWithTimeout(
      webhookUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "WCBA-Website/1.0",
        },
        body: payload,
      },
      DISCORD_FETCH_TIMEOUT
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error("[submitMemberUpdateRequest] Discord webhook error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText.substring(0, 500), // Limit error log size
      });

      // Don't expose Discord-specific errors to users
      if (response.status === 429) {
        return {
          success: false,
          error: "Too many requests. Please try again later.",
        };
      }

      return {
        success: false,
        error: "Failed to send notification. Please try again later.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[submitMemberUpdateRequest] Error sending Discord webhook:", error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message === "Request timeout") {
        return {
          success: false,
          error: "Request timed out. Please try again later.",
        };
      }
    }

    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

