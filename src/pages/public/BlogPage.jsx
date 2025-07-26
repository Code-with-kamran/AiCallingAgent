import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useRouter } from '../../context/RouterContext';

const BlogPage = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={navigate} />
      <main className="flex-1 pt-16 container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600 mb-8">Read the latest updates, tips, and insights on AI and automation.</p>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
