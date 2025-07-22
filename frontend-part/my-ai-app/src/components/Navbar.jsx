// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 mb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold text-sky-600">
          Femicare
        </Link>
        <div className="flex gap-4">
          <Link to="/dashboard" className="text-sky-600">Dashboard</Link>
          <Link to="/history" className="text-sky-600">History</Link>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
