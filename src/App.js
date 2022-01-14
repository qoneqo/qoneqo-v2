import React from 'react';
import './app.scss';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <div className="App">
        <div className="flex">
          <Sidebar />
          <div className="w-full">
            <Header />
            <Content />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
