import { Link, NavLink } from "react-router-dom";
import { Facebook, Linkedin } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Left: Site Title */}
        <div className="text-2xl font-bold text-gray-900">
          <Link to="/">KevinLepiten</Link>
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-600 ${
                isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-600 ${
                isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-gray-700 hover:text-blue-600 ${
                isActive ? "font-semibold text-blue-600" : ""
              }`
            }
          >
            Contact Me
          </NavLink>
        </nav>

        {/* Right: Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com/varcharnamekevin"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600" />
          </a>

          <a
            href="https://www.linkedin.com/in/kevinlepiten/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-700" />
          </a>
        </div>
      </div>
    </header>
  );
}
