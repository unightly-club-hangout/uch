import React from 'react';

function Navigation({ setActiveSection }) {
  return (
    <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h2>Navigation</h2>
      <ul>
        <li style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={() => setActiveSection('posts')}>Posts</li>
        <li style={{ marginBottom: '10px', cursor: 'pointer' }} onClick={() => setActiveSection('editor')}>Editor</li>
      </ul>
    </div>
  );
}

export default Navigation;