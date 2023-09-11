// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostForm from './Components/PostForm'; 
import PostList from './Components/PostList';
import Login from './Components/Login';
import { selectIsAdmin } from './store/Slices/authSlice';
import { logout} from './store/Slices/authSlice';
import './App.css';
import styles from './Styles/Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReadMore from './Components/ReadMore';
import EditPostForm from './Components/EditForm';

const App = () => {
  const isAdmin = useSelector(selectIsAdmin);
  const dispatch = useDispatch();
  // const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div >
        {/* Navigation Bar */}
        <nav className={styles.navbar}>
          <ul>
            <li>
              <Link to="/"><strong>Home</strong></Link>
            </li>
            {!isAdmin ? (
            <li>
              <Link to="/login"><strong>Login</strong></Link>
            </li>
            ) : ((
            <li>
              
              <Link to="/post-form"><strong>Add Post</strong></Link>
              <>
              <button onClick={handleLogout} >Logout</button>
              </>
            </li>    
            ))}
          </ul>
          
        </nav>

        {/* Main Content */}
        <Routes>
          {/* <Route path="/login" component={Login} /> */}
          <Route path="/login"  element={<Login />} />
          <Route path="/post-form" element={<PostForm />} />
          <Route path="/" element={<PostList />} />
          <Route path="/read-more/:postId" element={<ReadMore />} />
          <Route path="/edit-post/:postId" element={<EditPostForm/>} />
        </Routes>
      </div>
    </Router> 
  );
};

export default App;

