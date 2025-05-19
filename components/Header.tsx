import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="w-full bg-white shadow">
      <div className="container mx-auto py-3 flex items-center justify-between">
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
          <Button className="ml-6 bg-red-600 text-white hover:bg-red-700 cursor-pointer">
            Join Today
          </Button>
        </Link>
      </div>
    </header>
  );
}
