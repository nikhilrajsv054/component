// // PostList.js
// import React from "react";
// import { useSelector } from "react-redux";
// import { selectPosts } from "../store/Slices/postsSlice";
// import styles from "../Styles/PostList.module.css";

// const PostList = () => {
//   const posts = useSelector(selectPosts);

//   return (
//     <div className={styles["post-list"]}>
//       <h2>Post List</h2>
//       {(posts || []).length === 0 ? (
//         <p>No posts yet.</p>
//       ) : (
//         posts.map((post, id) => (
//           <div className={styles["post"]} key={id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <p className={styles["likes"]}>Likes: {post.likes}</p>
//             <div className={styles["actions"]}>
//               {/* like and comment buttons */}
//             </div>
//             {/* <ul className={styles['comment-list']}>
//               {post.comments.map((comment, index) => (
//                 <li className={styles['comment-item']} key={index}>
//                   {comment}
//                 </li>
//               ))}
//             </ul> */}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default PostList;

// // PostList.js - rl2
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectPosts, likePost, commentPost, editPost } from '../store/Slices/postsSlice'; // Import editPost action
// import { selectIsAdmin } from '../store/Slices/authSlice';
// import styles from '../Styles/PostList.module.css';
// import { Link } from 'react-router-dom';
// // import FavoriteIcon from '@material-ui/icons/Favorite';
// // import CommentIcon from '@material-ui/icons/Comment';

// const PostList = () => {
//   const posts = useSelector(selectPosts);
//   const isAdmin = useSelector(selectIsAdmin);
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = useState(false); // state to track editing mode
//   const [editedPost, setEditedPost] = useState({}); // state to store edited post

//   const handleEdit = (post) => {
//     setEditedPost({ ...post }); // Set the edited post
//     setIsEditing(true); // Enter editing mode
//   };

//   const handleSaveEdit = () => {
//     dispatch(editPost(editedPost)); // Dispatch the editPost action with the edited post
//     setIsEditing(false); // Exit editing mode
//     setEditedPost({}); // Clear the edited post
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false); // Exit editing mode
//     setEditedPost({}); // Clear the edited post
//   };

//   const handleLike = (postId) => {
//     dispatch(likePost(postId));
//   };

//   const handleComment = (postId) => {
//     dispatch(commentPost({ postId, comment: 'Sample comment' }));
//   };
  

//   return (
//     <div className={styles['post-list']}>
//       <h2>Post List</h2>
//       {posts.length === 0 ? (
//         <p>No posts yet.</p>
//       ) : (
//         posts.map((post) => (
//           <div className={styles['post']} key={post.id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <p className={styles['created-at']}>Created At: {post.createdAt}</p>
//             <div className={styles['actions']}>
//               <div className={styles['action-item']}>
//                 <button onClick={() => handleLike(post.id)}>
//                   {/* <FavoriteIcon /> Like */} Like
//                 </button>
//                 <span>{post.likes}</span>
//               </div>
//               <div className={styles['action-item']}>
//                 <button onClick={() => handleComment(post.id)}>
//                   {/* <CommentIcon /> Comment */} Comment
//                 </button>
//                 {/* <span>{post.comments.length}</span> */}
//               </div>
//               {/* {isAdmin && (
//                 <div className={styles['action-item']}>
//                   {isEditing ? (
//                     <>
//                       <button onClick={handleSaveEdit}>Save</button>
//                       <button onClick={handleCancelEdit}>Cancel</button>
//                     </>
//                   ) : (
//                     <button onClick={() => handleEdit(post)}>Edit</button>
//                   )}
//                 </div>
//               )} */}
              
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default PostList;

// // PostList.js
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectPosts, likePost, commentPost, editPost } from '../store/Slices/postsSlice';
// import { selectIsAdmin } from '../store/Slices/authSlice';
// import { Link } from 'react-router-dom';
// import styles from '../Styles/PostList.module.css';
// // import FavoriteIcon from '@material-ui/icons/Favorite';
// // import CommentIcon from '@material-ui/icons/Comment';

// const PostList = () => {
//   const posts = useSelector(selectPosts);
//   const isAdmin = useSelector(selectIsAdmin);
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedPost, setEditedPost] = useState({});
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [commentText, setCommentText] = useState(''); // Add state for comment text

//   const handleEdit = (post) => {
//     setEditedPost({ ...post });
//     setIsEditing(true);
//   };

//   const handleSaveEdit = () => {
//     dispatch(editPost(editedPost));
//     setIsEditing(false);
//     setEditedPost({});
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setEditedPost({});
//   };

//   const handleLike = (postId) => {
//     dispatch(likePost(postId));
//   };

//   const handleComment = (postId) => {
//     setSelectedPost(postId); // Set the selected post for comment
//     setCommentText(''); // Clear the comment text when showing the comment form
//   };

//   const handleCommentSubmit = () => {
//     if (commentText.trim() !== '') {
//       dispatch(commentPost({ postId: selectedPost, comment: commentText }));
//       setSelectedPost(null); // Clear the selected post to hide the comment form
//     }
//   };

//   return (
//     <div className={styles['post-list']}>
//       <h2>Post List</h2>
//       {posts.length === 0 ? (
//         <p>No posts yet.</p>
//       ) : (
//         posts.map((post) => (
//           <div className={styles['post']} key={post.id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             <p className={styles['created-at']}>Created At: {post.createdAt}</p>
//             <div className={styles['actions']}>
//               <div className={styles['action-item']}>
//                 <button onClick={() => handleLike(post.id)}>
//                   Like
//                 </button>
//                 <span>{post.likes}</span>
//               </div>
//               <div className={styles['action-item']}>
//                 {selectedPost === post.id ? (
//                   // Display the comment form for the selected post
//                   <div className={styles['comment-form']}>
//                     <input
//                       type="text"
//                       placeholder="Add a comment"
//                       value={commentText}
//                       onChange={(e) => setCommentText(e.target.value)}
//                     />
//                     <button onClick={handleCommentSubmit}>Submit</button>

//                     <ul className={styles['comment-list']}>
//                       <ul>
//                         <li>
//                       {post.comments.map((comment, index) => (
//                         <li key={index}>{comment}</li>
//                       ))}
//                       </li>
//                       </ul>
//                     </ul>
//                   </div>
                  
//                 ) : (
//                   // Display the "Comment" button when not in comment mode
//                   <button onClick={() => handleComment(post.id)}>
//                     {/* <CommentIcon /> Comment */} Comment
//                   </button>
//                 )}
//                 <span>{post.comments.length}</span>
//               </div>
//               {isAdmin && (
//                 <div className={styles['action-item']}>
//                   {isEditing ? (
//                     <>
//                       <button onClick={handleSaveEdit}>Save</button>
//                       <button onClick={handleCancelEdit}>Cancel</button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => handleEdit(post)}>Edit</button>
//                       <Link to={`/full-post/${post.id}`}>Read more</Link>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default PostList;