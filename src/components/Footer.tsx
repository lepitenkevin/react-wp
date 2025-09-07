import { Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} Kevin Lepiten. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4 mt-2 md:mt-0">
          <a
            href="https://facebook.com/varcharnamekevin"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook className="w-5 h-5 hover:text-white" />
          </a>

          <a
            href="https://www.linkedin.com/in/kevinlepiten/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="w-5 h-5 hover:text-blue-400" />
          </a>
        </div>
      </div>
    </footer>
  );
}
