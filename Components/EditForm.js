
// EditPostForm.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { addPost, editPost, selectPostById } from '../store/Slices/postsSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditPostForm = () => {
//   const post = useSelector((state) => state.posts.find((post) => post.id === postId));
const { postId } = useParams(); 
  const post = useSelector((state) => selectPostById(state, postId));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editedPost, setEditedPost] = useState({
    title: post.title,
    content: post.content,
  });

  const handleTitleChange = (e) => {
    setEditedPost({ ...editedPost, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setEditedPost({ ...editedPost, content: e.target.value });
  };

  const handleEditSubmit = () => {
    dispatch(editPost({ ...editedPost, id: postId, title: editedPost.title, content: editedPost.content }));
    navigate('/');
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <label>Title:</label>
      <input type="text" value={editedPost?.title} onChange={handleTitleChange} />
      <label>Content:</label>
      <textarea value={editedPost?.content} onChange={handleContentChange} />
      <button onClick={handleEditSubmit}>Save</button>
    </div>
  );
};

export default EditPostForm;