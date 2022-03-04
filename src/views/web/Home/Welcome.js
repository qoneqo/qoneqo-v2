import React from 'react';
import HeaderImg from '../../../assets/images/programming-vector.jpg';

const Welcome = () => {
  return (
    <div className="bg-white flex" id="banner">
      <div
        className={`w-full md:w-1/3 h-60 md:h-auto text-center flex flex-col justify-center bg-gradient-to-r from-sky-600 to-primary text-white`}
      >
        <p className="text-2xl md:text-3xl md:text-white">
          Welcome to Qoneqo's Blog
        </p>
        {/* <p className="text-md md:text-2xl md:text-secondary"></p> */}
        {/* <button className="text-tertiary bg-white d-inline-block w-fit mx-auto p-2 my-2 rounded font-semibold border-2 border-purple-200">Dive In</button> */}
      </div>
      <div className="hidden md:block md:w-2/3">
        <img className="-hue-rotate-30" src={`${HeaderImg}`} alt="" />
      </div>
    </div>
  );
};

export default Welcome;
