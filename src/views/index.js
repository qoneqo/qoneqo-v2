import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Web from '../Web';
import Home from './web/Home';
import Articles from './web/Articles';
import Login from './web/Login';
import App from '../App';
import Dashboard from './app/Dashboard';
import Users from './app/Users';
import Context from './Context';

axios.defaults.withCredentials = true

const Index = () => {
  const [context, setContext] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Context.Provider value={{context, setContext}}>
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
        </Context.Provider>
      </BrowserRouter>
    </>
  );
};

export default Index;
