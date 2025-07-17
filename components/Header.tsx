"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow">
      <div className="container mx-auto py-3">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logo.jpg"
                alt="Logo"
                width={64}
                height={64}
                className="rounded"
                priority
              />
              <span className="text-xl font-bold text-gray-900 whitespace-nowrap">
                Wayne County Bar Association
              </span>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link
                href="/current-members"
                className="text-base font-medium text-gray-700 hover:text-black"
              >
                Current Members
              </Link>
              <Link
                href="/members"
                className="text-base font-medium text-gray-700 hover:text-black"
              >
                Member List
              </Link>
              <Link
                href="/public-resources"
                className="text-base font-medium text-gray-700 hover:text-black"
              >
                Public Resources
              </Link>
              <Link
                href="/contact"
                className="text-base font-medium text-gray-700 hover:text-black"
              >
                Contact
              </Link>
            </nav>
          </div>
          <Link href="/new-members">
            <Button className="bg-red-600 text-white hover:bg-red-700 cursor-pointer">
              Join Today
            </Button>
          </Link>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={64}
              height={64}
              className="rounded"
              priority
            />
            <span className="text-xl font-bold text-gray-900 whitespace-nowrap hidden sm:block">
              Wayne County Bar Association
            </span>
          </Link>
          <button
            onClick={toggleMenu}
            className="p-2 text-gray-700 hover:text-black focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="/current-members"
              className="block text-base font-medium text-gray-700 hover:text-black py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Current Members
            </Link>
            <Link
              href="/members"
              className="block text-base font-medium text-gray-700 hover:text-black py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Member List
            </Link>
            <Link
              href="/public-resources"
              className="block text-base font-medium text-gray-700 hover:text-black py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Public Resources
            </Link>
            <Link
              href="/contact"
              className="block text-base font-medium text-gray-700 hover:text-black py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
