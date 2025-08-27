import React from 'react';

function PostEditor() {
  return (
    <div>
      <h2>Post Editor</h2>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" rows="5" />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default PostEditor;