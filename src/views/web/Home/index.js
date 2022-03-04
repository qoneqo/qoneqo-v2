import React from 'react';
import Welcome from './Welcome';
import About from './About';
import Article from './Article';

const Home = () => {
  return (
    <>
      <div className="home">
        <Welcome />
        <About />
        <Article />
      </div>
    </>
  );
};

export default Home;
