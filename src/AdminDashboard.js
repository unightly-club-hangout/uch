import React, { useState } from 'react';
import PostList from './PostList';
import PostEditor from './PostEditor';
import Navigation from './Navigation';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('posts'); // Initial section

  const renderSection = () => {
    switch (activeSection) {
      case 'posts':
        return <PostList />;
      case 'editor':
        return <PostEditor />;
      default:
        return <div>Select a section from the navigation.</div>;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navigation setActiveSection={setActiveSection} />
      <div style={{ flex: 1, padding: '20px' }}>
        {renderSection()}
      </div>
    </div>
  );
}

export default AdminDashboard;
