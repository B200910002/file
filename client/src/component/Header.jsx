import React, { useContext } from "react";
// import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <a href="/file/upload" className="text-lg font-bold text-gray-800">
            File upload
          </a>
          <ul className="flex">
            <li>
              <a
                href="/file"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Files
              </a>
            </li>
            <li>
              <a href="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100">
                {user.email}
              </a>
            </li>
            <li>
              <a
                href="/auth/login"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => logout()}
              >
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
