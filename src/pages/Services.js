import React from 'react';

function Services() {
  const services = [
    {
      id: 1,
      title: 'SEO Optimization',
      description: 'Boost your online visibility with our comprehensive SEO strategies',
      features: ['Keyword Research', 'On-page SEO', 'Link Building', 'Technical SEO']
    },
    {
      id: 2,
      title: 'Social Media Marketing',
      description: 'Engage your audience and build your brand on social platforms',
      features: ['Content Creation', 'Community Management', 'Paid Ads', 'Analytics']
    },
    {
      id: 3,
      title: 'Content Marketing',
      description: 'Create compelling content that converts and engages',
      features: ['Blog Posts', 'Videos', 'Infographics', 'Case Studies']
    },
    {
      id: 4,
      title: 'PPC Advertising',
      description: 'Get immediate results with targeted paid advertising campaigns',
      features: ['Google Ads', 'Facebook Ads', 'Conversion Tracking', 'ROI Optimization']
    },
    {
      id: 5,
      title: 'Email Marketing',
      description: 'Build relationships and drive conversions through email',
      features: ['Campaign Management', 'Automation', 'Segmentation', 'A/B Testing']
    },
    {
      id: 6,
      title: 'Web Design',
      description: 'Create stunning, responsive websites that convert',
      features: ['UI/UX Design', 'Responsive Design', 'E-commerce', 'Optimization']
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1>Our Services</h1>
        <p>Comprehensive digital marketing solutions for your business</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service.id} className="card p-6 border-l-4 border-primary hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="mb-4">
                <h4 className="font-bold text-dark mb-2">Features:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="text-gray-600 flex items-center">
                      <span className="text-primary font-bold mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="primary-button w-full mt-4">Learn More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
