import React from "react";
import { useSelector } from "react-redux";
import { selectPostById, selectPosts } from "../store/Slices/postsSlice";
import { useLocation, useParams  } from "react-router-dom";
import styles from "../Styles/ReadMore.module.css";


const ReadMore = () => {

  const { postId } = useParams(); // allows you to access the location object that represents the active URL.  
  
  // console.log(postId, useParams());
  const posts = useSelector((state) => selectPostById(state, postId));
  // console.log(posts);

  return (
    <div className={styles.container}>
      <img src="https://www.seiu1000.org/sites/main/files/main-images/camera_lense_0.jpeg" alt="blog pic " />
      <h1 className={styles.heading}>{posts?.title}</h1>
      <p className={styles.summary}>{posts?.summary}</p>
      <p className={styles.content} >{posts?.content}</p>
    </div>
  );
};

export default ReadMore;
