import React from 'react';

function About() {
  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1>About Creative Touch</h1>
        <p>Building Digital Success Stories Since 2020</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At Creative Touch, we believe in the power of strategic digital marketing to transform businesses.
            Our mission is to help companies of all sizes reach their target audience, build meaningful connections,
            and achieve measurable growth.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2020, Creative Touch started with a simple idea: to provide high-quality digital marketing
            services that deliver real results. What began as a small team has grown into a dynamic agency with
            clients across various industries.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <h3 className="font-bold text-primary mb-2">Innovation</h3>
              <p className="text-gray-600">We stay ahead of industry trends and embrace new technologies</p>
            </div>
            <div className="card p-6 text-center">
              <h3 className="font-bold text-primary mb-2">Integrity</h3>
              <p className="text-gray-600">Honesty and transparency in all our client relationships</p>
            </div>
            <div className="card p-6 text-center">
              <h3 className="font-bold text-primary mb-2">Excellence</h3>
              <p className="text-gray-600">Committed to delivering outstanding results</p>
            </div>
            <div className="card p-6 text-center">
              <h3 className="font-bold text-primary mb-2">Collaboration</h3>
              <p className="text-gray-600">Working as partners with our clients to achieve their goals</p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Team</h2>
          <p className="text-gray-600">Our talented team consists of digital marketing experts, designers, and strategists dedicated to your success.</p>
        </section>
      </div>
    </div>
  );
}

export default About;
