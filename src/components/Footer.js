import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br relative z-50 from-dark to-gray-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-3 text-primary">Creative Touch</h3>
            <p className="text-gray-300">Your digital marketing partner for success</p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-primary">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="/services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="/portfolio" className="hover:text-primary transition-colors">Portfolio</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-primary">Contact Us</h4>
            <p className="text-gray-300">Email: info@creativetouch.com</p>
            <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-primary">Follow Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#facebook" className="hover:text-primary transition-colors">Facebook</a></li>
              <li><a href="#twitter" className="hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#linkedin" className="hover:text-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-black bg-opacity-20 border-t border-gray-600 py-4">
        <p className="text-center text-gray-400 m-0">&copy; 2026 Creative Touch. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
