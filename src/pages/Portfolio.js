import React from 'react';

function Portfolio() {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Growth',
      category: 'SEO & PPC',
      description: 'Increased online sales by 150% for a fashion retailer',
      results: '150% increase in revenue'
    },
    {
      id: 2,
      title: 'Brand Awareness Campaign',
      category: 'Social Media',
      description: 'Built brand presence for a startup tech company',
      results: '500K social media reach'
    },
    {
      id: 3,
      title: 'Content Marketing Strategy',
      category: 'Content',
      description: 'Established thought leadership for B2B company',
      results: '300% increase in organic traffic'
    },
    {
      id: 4,
      title: 'Web Design & Development',
      category: 'Web Design',
      description: 'Created responsive website for healthcare provider',
      results: '45% improvement in user engagement'
    },
    {
      id: 5,
      title: 'Email Marketing Campaign',
      category: 'Email Marketing',
      description: 'Designed automated email funnel for SaaS company',
      results: '35% conversion rate'
    },
    {
      id: 6,
      title: 'Complete Digital Overhaul',
      category: 'Full Service',
      description: 'Transformed digital presence for manufacturing company',
      results: '200% ROI in first year'
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1>Our Portfolio</h1>
        <p>Showcase of our successful projects and client achievements</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="card overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-full h-40 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-center p-4">
                {project.category}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-dark mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="bg-blue-50 border-l-4 border-primary p-3">
                  <strong className="text-dark">Result:</strong> {project.results}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
