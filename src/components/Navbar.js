import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-primary to-secondary shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:scale-105 transition-transform">
            Creative Touch
          </Link>
          <ul className="flex list-none gap-8 m-0 p-0 items-center flex-wrap justify-end">
            <li>
              <Link to="/" className="text-white font-medium transition-all hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white font-medium transition-all hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-white font-medium transition-all hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md">
                Services
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="text-white font-medium transition-all hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="text-white font-medium transition-all hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white font-medium transition-all hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/admin" className="text-white font-medium bg-white bg-opacity-30 hover:bg-white hover:text-primary px-4 py-2 rounded-md border border-white transition-all">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
