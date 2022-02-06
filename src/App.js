import { useState, useLayoutEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './app.css';
import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';
import AppContent from './components/AppContent';
import AppFooter from './components/AppFooter';
import Context from './views/Context';

const App = () => {
  const navigate = useNavigate();
  const { setContext } = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
          <AppSidebar className="flex-none" />
          <div className="w-full flex-auto">
            <AppHeader />
            <AppContent />
            <AppFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
