import React from 'react';
import { useState, useLayoutEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './index.css';
import AppHeader from '../../components/AppHeader';
import AppSidebar from '../../components/AppSidebar';
import AppContent from '../../components/AppContent';
import AppFooter from '../../components/AppFooter';
import Context from '../Context';

const App = () => {
  const navigate = useNavigate();
  const { setContext } = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navCollapse, setNavCollapse] = useState(true);

  const handleNavCollapse = () => {
    setNavCollapse(prev => !prev)
  }

  useLayoutEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/show`)
    .then(({data}) => {
      setContext(prevContext => ({
        ...prevContext,
        userName: data.name
      }))
      setIsLoggedIn(true);
    })
    .catch(() => {
      navigate('/');
    })
  }, [])
  
  return (
    isLoggedIn && 
    <>
      <div className="App">
        <div className="flex w-full">
          <AppSidebar navCollapse={navCollapse} />
          <div className="w-[75%] flex-auto flex-shrink">
            <AppHeader handleNavCollapse={[navCollapse, handleNavCollapse]} />
            <AppContent />
            <AppFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
