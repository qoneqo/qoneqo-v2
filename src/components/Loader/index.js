import React from 'react';
import './index.css';

const Loader = ({ className }) => {
  return (
    <>
      <div className={`loader load-container ${className}`}>
        <div className="load-dot dot-one"></div>
        <div className="load-dot dot-two"></div>
        <div className="load-dot dot-three"></div>
      </div>
    </>
  );
};

Loader.defaultProps = {
  className: '',
};

export default Loader;
