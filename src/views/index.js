import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Interceptors from './Interceptors';
import Web from './web';
import Home from './web/Home';
import Articles from './web/Articles';
import Article from './web/Article';
import Login from './web/Login';
import App from './app';
import Dashboard from './app/Dashboard';
import Apps from './app/Apps';
import Users from './app/Users';
import Modules from './app/Modules';
import Context from './Context';
import Roles from './app/Roles';
import CreateRoles from './app/Roles/Create';
import EditRoles from './app/Roles/Edit';
import CreateApps from './app/Apps/Create';
import EditApps from './app/Apps/Edit';
import CreateUsers from './app/Users/Create';
import EditUsers from './app/Users/Edit';

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
              <Route path="article/:slug" element={<Article />} />
              <Route path="login" element={<Login />} />
            </Route>
            <Route path="/dashboard" element={<Interceptors><App /></Interceptors>}>
              <Route index element={<Dashboard />} />
              <Route path="apps" element={<Apps />} />
              <Route path="apps/create" element={<CreateApps />} />
              <Route path="apps/edit/:id" element={<EditApps />} />
              <Route path="users" element={<Users />} />
              <Route path="users/create" element={<CreateUsers />} />
              <Route path="users/edit/:id" element={<EditUsers />} />
              <Route path="modules" element={<Modules />} />
              <Route path="roles" element={<Roles />} />
              <Route path="roles/create" element={<CreateRoles />} />
              <Route path="roles/edit/:id" element={<EditRoles />} />
            </Route>
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </>
  );
};

export default Index;
