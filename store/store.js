// store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import postsSlice from './Slices/postsSlice';
const store = configureStore({
  reducer: {
    auth: authSlice, 
    posts: postsSlice,

  },
});

export default store;
