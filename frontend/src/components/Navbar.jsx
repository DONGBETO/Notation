import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive
        ? "text-sky-700 font-semibold underline underline-offset-4"
        : "text-sky-500 hover:text-sky-700 hover:underline hover:underline-offset-4"
    }`;

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + titre */}
        <NavLink to="/" className="flex items-center gap-2">
          {/* Logo SVG simple */}
  
          <span className="text-xl font-bold text-sky-700 select-none">NoteAvis</span>
        </NavLink>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          <NavLink to="/" className={linkClass}>
            Accueil
          </NavLink>
          <NavLink to="/devenir-service" className={linkClass}>
            Devenir service
          </NavLink>
          <NavLink to="/donner-avis" className={linkClass}>
            Donner avis
          </NavLink>
          <NavLink to="/login" className={linkClass}>
            Se connecter
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-sky-600 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
        >
          <svg
            className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
          <svg
            className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>
              Accueil
            </NavLink>
            <NavLink to="/devenir-service" className={linkClass} onClick={() => setIsOpen(false)}>
              Devenir service
            </NavLink>
            <NavLink to="/donner-avis" className={linkClass} onClick={() => setIsOpen(false)}>
              Donner avis
            </NavLink>
            <NavLink to="/login" className={linkClass} onClick={() => setIsOpen(false)}>
              Se connecter
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
