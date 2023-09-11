// PostList.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPosts,
  likePost,
  commentPost,
  editPost,
  selectPostById,
} from "../store/Slices/postsSlice";
import { selectIsAdmin } from "../store/Slices/authSlice";
import styles from "../Styles/PostList.module.css";
import ReadMore from "./ReadMore";
import {
  AiFillLike,
  AiFillMessage,
  AiFillEdit,
  AiFillRead,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";

const {api} = window;

const PostList = () => {
  const posts = useSelector(selectPosts);
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const postsLikes = useSelector((state) => selectPostById(state, selectedPost));



  const handleLike = (postId) => {
    dispatch(likePost(postId));
    console.log(posts.like);
    api.send('addPost',posts.like)
  };

  const handleComment = (postId) => {
    setSelectedPost(selectedPost === postId ? null : postId); // Toggle selected post
    setCommentText("");
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      dispatch(commentPost({ postId: selectedPost, comment: commentText }));
      setCommentText("");
    }

    
    const updatedComment = {...posts, comments: commentText}
    api.send('addPost', updatedComment );
  };

  const handleCancelComment = () => {
    setSelectedPost(null);
    setCommentText("");
    // setCommentAuthor(''); // Clear the author name input
  };

  console.log(selectedPost);

  return (
    <div className={styles["post-list"]}>
      <h2>Post List</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div className={styles["post"]} key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <p className={styles["created-at"]}>Created At: {post.createdAt}</p>
            <div className={styles["actions"]}>
              <div className={styles["action-item"]}>
                {selectedPost !== post.id && ( // Hide "Like" and "Edit" buttons when comments are displayed
                  <>
                    <button onClick={() => handleLike(post.id)}>
                      <AiFillLike />
                      <strong>{` : ${post.likes}`}</strong>
                    </button>
                    <span></span>
                  </>
                )}
              </div>
              {/* Comments code */}
              <div className={styles["action-item"]}>
                {selectedPost === post.id ? (
                  <div className={styles["comment-form"]}>
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button onClick={handleCommentSubmit}>Submit</button>
                    <button onClick={handleCancelComment}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => handleComment(post.id)}>
                    <AiFillMessage stroke={35} width={60} height={400} />
                    <strong>{` : ${post.comments.length}`}</strong>
                  </button>
                )}
                {selectedPost === post.id && (
                  <ul className={styles["comment-list"]}>
                    <h4>Comments</h4>
                    <ul>
                      <li>
                        {post.comments.map((comment, index) => (
                          <>
                            {/* <BiUserCircle/> */}
                            <li key={index}>{comment}</li>
                          </>
                        ))}
                      </li>
                    </ul>
                  </ul>
                )}
              </div>
              {/* {isAdmin && selectedPost !== post.id && (
                <div className={styles["action-item"]}>
                  {isEditing ? (
                    <>
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <Link to={`/read-more/${post.id}`} className={styles['read-more']}>
                      Read more
                    </Link>
                  )}
                  
                </div>
              )} */}

              {isAdmin && (
                <div>
                  
                  <button>
                    <Link to={`/edit-post/${post.id}`} className={styles["edit"]}>
                      Edit
                    </Link>
                  </button> 
                  
                  <button>
                    <Link
                    to={`/read-more/${post.id}`}
                    className={styles["read-more"]}
                    >
                    Read more
                    </Link>
                  </button>


                </div>
              )}

              
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;

