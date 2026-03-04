import React, { useState, useEffect } from 'react';
import { blogService } from '../utils/apiService';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogService.getAllBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs. Please try again later.');
      // Fallback to demo blogs if backend is not available
      setBlogs(getDemoBlogs());
    } finally {
      setLoading(false);
    }
  };

  const getDemoBlogs = () => {
    return [
      {
        id: 1,
        title: 'The Future of SEO in 2026',
        author: 'John Smith',
        date: 'March 1, 2026',
        category: 'SEO',
        excerpt: 'Explore the latest trends and predictions for search engine optimization...',
        image: 'SEO'
      },
      {
        id: 2,
        title: 'Social Media Marketing Tips for Small Businesses',
        author: 'Sarah Johnson',
        date: 'February 28, 2026',
        category: 'Social Media',
        excerpt: 'Learn practical strategies to grow your business using social media platforms...',
        image: 'Social'
      },
      {
        id: 3,
        title: 'Content Marketing: Quality Over Quantity',
        author: 'Mike Davis',
        date: 'February 25, 2026',
        category: 'Content',
        excerpt: 'Why creating high-quality content matters more than pushing volume...',
        image: 'Content'
      },
      {
        id: 4,
        title: 'Email Marketing Automation Best Practices',
        author: 'Emily Wilson',
        date: 'February 20, 2026',
        category: 'Email Marketing',
        excerpt: 'Maximize conversions with intelligent email automation workflows...',
        image: 'Email'
      },
      {
        id: 5,
        title: 'Web Design Trends for 2026',
        author: 'Alex Brown',
        date: 'February 15, 2026',
        category: 'Design',
        excerpt: 'Discover the latest web design trends that will dominate this year...',
        image: 'Design'
      },
      {
        id: 6,
        title: 'PPC Advertising: Maximizing Your ROI',
        author: 'Lisa Anderson',
        date: 'February 10, 2026',
        category: 'PPC',
        excerpt: 'Advanced strategies to improve your paid advertising performance...',
        image: 'PPC'
      }
    ];
  };

  return (
    <div className="min-h-screen">
      <div className="page-header">
        <h1>Blog</h1>
        <p>Insights and tips for digital marketing success</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-12">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
              <article key={blog.id} className="card card-hover p-0 overflow-hidden hover:shadow-xl transition-all">
                <div className="w-full h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                  {blog.image || blog.category}
                </div>
                <div className="p-4">
                  <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-bold mb-3">
                    {blog.category}
                  </span>
                  <h3 className="text-lg font-bold text-dark mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <span>{blog.author}</span>
                    <span>{blog.date}</span>
                  </div>
                  <a href="#read-more" className="text-primary font-bold text-sm hover:text-secondary transition-colors inline-flex items-center">
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blogs available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blogs;
