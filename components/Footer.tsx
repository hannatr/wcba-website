import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-500 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between space-y-6 md:space-y-0">
          <div>
            <h2 className="font-bold">Wayne County Bar Association</h2>
            <p>P.O. Box 284</p>
            <p>Lyons, NY 14489</p>
          </div>
          <div>
            <p>waynecountybarny@gmail.com</p>
            <p>Attorney Referral Resource:</p>
            <p>
              <Link
                href="https://nysba.intouchondemand.com/findlawyer/search"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                New York State Bar Lawyer Referral Service
              </Link>
            </p>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>Copyright 2025 Wayne County Bar Association - New York</p>
        </div>
      </div>
    </footer>
  );
}
