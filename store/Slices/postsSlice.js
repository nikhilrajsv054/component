// postsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [], // Initial state with an empty array
};


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      console.log(state);
      state.posts.push(action.payload); // Add a new post
    },
    likePost: (state, action) => {
      const post = state.posts.find((post) => post.id === action.payload);
      if (post) {
        post.likes += 1; // Increment the likes count
      }
    },
    commentPost: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((post) => post.id === +postId);
      if (post) {
        post.comments.push(comment); // Add a comment to the post
      }
    },
    editPost: (state, action) => {
      
      const { id, title, content } = action.payload;
      const post = state.posts.find((post) => post.id === +id);
      
      if (post) {
        post.title = title;
        post.content = content;
      }
    },
    
  },
});

export const { addPost, likePost, commentPost, editPost} = postsSlice.actions;
export const selectPosts = (state) => state.posts.posts;
export const selectPostById = (state, postId) => {
  console.log(state.posts);
  return state.posts.posts.find((post) => post.id === +postId); // + it will convert the strin into integer
};

export const selectCommentsById = (state, postId) => {
  console.log(state.posts);
  const post = state.posts.posts.find((post) => post.id === +postId); 
  return post ? post.comments : [];
  // + it will convert the strin into integer
};


// export const editDetails = (state)
// export const selectPosts = (state,id) => state.posts.posts;
export default postsSlice.reducer;
