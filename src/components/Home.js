import * as React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "./../AuthContext";

import HomePage from './HomePage.js';
import Login from './Auth/Login.js';
import Register from './Auth/Register.js';
import NavTop from './Auth/NavTop.js';
import AddTask from './AddTask.js';
import Dashboard from './Dashboard.js';
import Projects from './Projects.js';
import AddProjects from './AddProject.js';
import Tasks from './Tasks.js';


function Home() {

  const { currentUser } = useAuth();

  const loginlocation = useLocation();
  const isLoginPage = loginlocation.pathname === '/login';

  const signuplocation = useLocation();
  const isSignupPage = signuplocation.pathname === '/signup';

  return (
    <>
        {!isLoginPage && !isSignupPage && <NavTop/>}
        <Routes>
            <Route path="/" exact element={<HomePage/>} />
            <Route path="/login" exact element={!currentUser ? <Login/> : <Navigate to="/" />} />
            <Route path="/signup" exact element={!currentUser ? <Register/> : <Navigate to="/" />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/addTask/:pid" element={<AddTask/>} />
            <Route path="/tasks/:proId" element={<Tasks/>} />
            <Route path="/projects" element={<Projects/>} />
            <Route path="/addProject" element={<AddProjects/>} />
        </Routes>
    </>
  

  );
}

export default Home;
