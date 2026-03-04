import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-4">Welcome to Creative Touch</h1>
              <p className="text-xl mb-8 opacity-90">Your Partner in Digital Marketing Excellence</p>
              <button className="cta-button">
                <Link to="/contact">Get Started</Link>
              </button>
            </div>

            {/* Right Image Placeholder */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md h-96 bg-white bg-opacity-20 rounded-xl border-2 border-white border-dashed flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-6xl mb-4">🖼️</div>
                  <p className="text-white font-semibold">Add Your Hero Image Here</p>
                  <p className="text-white text-sm opacity-75 mt-2">Recommended: 500x400px or larger</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 mb-12 mt-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-dark">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card p-6 text-center hover:shadow-xl transition-all">
            <h3 className="text-xl font-bold text-primary mb-3">Expert Team</h3>
            <p className="text-gray-600">Experienced professionals dedicated to your success</p>
          </div>
          <div className="card p-6 text-center hover:shadow-xl transition-all">
            <h3 className="text-xl font-bold text-primary mb-3">Data-Driven</h3>
            <p className="text-gray-600">Strategy based on analytics and market research</p>
          </div>
          <div className="card p-6 text-center hover:shadow-xl transition-all">
            <h3 className="text-xl font-bold text-primary mb-3">Results Focused</h3>
            <p className="text-gray-600">Proven track record of delivering tangible results</p>
          </div>
          <div className="card p-6 text-center hover:shadow-xl transition-all">
            <h3 className="text-xl font-bold text-primary mb-3">24/7 Support</h3>
            <p className="text-gray-600">Always here to help you succeed</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16 px-4 my-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-8 opacity-90">Let's work together to achieve your digital marketing goals</p>
          <button className="cta-button">
            <Link to="/contact">Contact Us Today</Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
