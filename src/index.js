import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Web from './Web';
import Home from './views/web/Home';
import Articles from './views/web/Articles';
import Login from './views/web/Login';
import App from './App';
import Dashboard from './views/app/Dashboard';
import Users from './views/app/Users';

// import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Web />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
