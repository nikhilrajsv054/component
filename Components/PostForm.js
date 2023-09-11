
// PostForm.js (Updated with id and content fields)
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, likePost, commentPost, selectPosts } from "../store/Slices/postsSlice"; // Import actions
import styles from "../Styles/PostForm.module.css"; // Import the CSS module
import { useNavigate } from "react-router-dom";
const { api } = window;

const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the history object
  const posts = useSelector(selectPosts);

  const [newPost, setNewPost] = useState({
    id: Date.now(),
    title: "",
    summary: "",
    content: "",
    likes: 0,
    comments: [],
    createdAt: new Date().toLocaleString(), 
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost(newPost));
    setNewPost({
      id: Date.now(),
      title: "",
      summary: "",
      content: "",
      likes: 0,
      comments: [],
      createdAt: new Date().toLocaleString(),
    });

    const updatedPost = [newPost,...posts];

    api.send('addPost', updatedPost);

    navigate("/");
  };
  return (
    <div className={styles["post-form"]}>
      <h2>Add a Post</h2>
      <form onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Summary" // Add a content field
          value={newPost.summary}
          onChange={(e) => setNewPost({ ...newPost, summary: e.target.value })}
          required
        />

        <textarea
          placeholder="Content" // Add a content field
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default PostForm;
