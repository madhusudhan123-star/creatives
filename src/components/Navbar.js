import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo_.png';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/blogs', label: 'Blogs' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .navbar-font { font-family: 'DM Sans', sans-serif; }
        .brand-font  { font-family: 'Syne', sans-serif; }

        /* Gradient text utility */
        .grad-text {
          background: linear-gradient(135deg, #3b82f6 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Shimmer animate on brand name */
        .brand-name {
          background-size: 200% auto;
          background-image: linear-gradient(135deg, #3b82f6 0%, #ec4899 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transition: background-position 0.5s ease;
        }
        .brand-name:hover { background-position: right center; }

        /* Tagline */
        .tagline-text {
          background: linear-gradient(90deg, #60a5fa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Nav link underline animation */
        .nav-item {
          position: relative;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 0;
          width: 0; height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #3b82f6, #ec4899);
          transition: width 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-item:hover::after,
        .nav-item.is-active::after { width: 100%; }

        /* Admin gradient button */
        .admin-btn {
          position: relative;
          padding: 7px 20px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.78rem;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          text-decoration: none;
          color: #fff;
          background: linear-gradient(135deg, #3b82f6, #ec4899);
          box-shadow: 0 3px 14px rgba(236,72,153,0.30), 0 1px 4px rgba(59,130,246,0.25);
          transition: transform 0.18s, box-shadow 0.18s, filter 0.18s;
          white-space: nowrap;
        }
        .admin-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 8px 24px rgba(236,72,153,0.40), 0 3px 8px rgba(59,130,246,0.30);
        }
        .admin-btn:active { transform: translateY(0); }

        /* Gradient ring around logo */
        .logo-ring {
          background: linear-gradient(135deg, #3b82f6, #ec4899);
          padding: 2.5px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: box-shadow 0.3s;
        }
        .logo-ring:hover {
          box-shadow: 0 0 0 4px rgba(236,72,153,0.18), 0 0 20px rgba(59,130,246,0.22);
        }
        .logo-inner {
          border-radius: 50%;
          overflow: hidden;
          width: 50px; height: 50px;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
        }
        .logo-inner img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
        }

        /* Hamburger lines */
        .hamburger span {
          display: block; height: 2px; border-radius: 2px;
          background: linear-gradient(90deg, #3b82f6, #ec4899);
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile slide-down */
        @keyframes slideDown {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .mobile-menu-anim { animation: slideDown 0.22s ease; }

        /* Animated gradient border below navbar */
        .navbar-border {
          height: 2px;
          background: linear-gradient(90deg, #3b82f6 0%, #ec4899 50%, #3b82f6 100%);
          background-size: 200% auto;
          animation: borderSlide 4s linear infinite;
        }
        @keyframes borderSlide {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <div className="sticky top-0 z-50 navbar-font">
        {/* Main nav */}
        <nav
          className={`backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? 'bg-white/97 shadow-lg shadow-pink-100/40'
              : 'bg-white/90 shadow-sm'
          }`}
        >
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="flex items-center justify-between h-[70px]">

              {/* ── LOGO + BRAND NAME ── */}
              <Link to="/" className="flex items-center gap-3 no-underline group">
                {/* Gradient ring clipping the square logo into a circle */}
                <div className="logo-ring">
                  <div className="logo-inner">
                    <img src={logo} alt="Logo" />
                  </div>
                </div>

                {/* Brand name + tagline stacked */}
                <div className="flex flex-col leading-tight select-none">
                  <span className="brand-name brand-font text-[1.25rem] font-extrabold tracking-tight">
                    Creators
                  </span>
                  <span className="brand-name brand-font text-[1.25rem] font-extrabold tracking-tight">
                    Touch
                  </span>
                </div>
              </Link>

              {/* ── DESKTOP NAV LINKS ── */}
              <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
                {navLinks.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`nav-item text-[0.875rem] font-medium pb-0.5 ${
                        isActive(to)
                          ? 'is-active grad-text font-semibold'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* ── HAMBURGER (mobile) ── */}
              <button
                className={`hamburger md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 p-1 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer border-none bg-transparent ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Toggle menu"
              >
                <span className="w-full" />
                <span className="w-3/4" />
                <span className="w-full" />
              </button>
            </div>
          </div>

          {/* ── MOBILE DROPDOWN MENU ── */}
          {menuOpen && (
            <div className="mobile-menu-anim md:hidden bg-white border-t border-pink-100 px-5 pt-3 pb-5 flex flex-col gap-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`block px-3 py-2.5 rounded-xl text-[0.95rem] font-medium transition-colors no-underline ${
                    isActive(to)
                      ? 'grad-text bg-gradient-to-r from-blue-50 to-pink-50 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* Animated gradient rule */}
        <div className="navbar-border" />
      </div>
    </>
  );
}

export default Navbar;