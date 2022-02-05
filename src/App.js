import { useLayoutEffect } from 'react';
import axios from 'axios';
import './app.css';
import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';
import AppContent from './components/AppContent';
import AppFooter from './components/AppFooter';

const App = () => {
  useLayoutEffect(() => {
    
  }, [])
  return (
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
