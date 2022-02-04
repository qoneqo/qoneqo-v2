import React, {useEffect} from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Home = () => {
  useEffect(() => {
    axios
      .get('http://localhost:9999', {withCredentials: true})
      .then(({data}) => {
        console.log(data)
      })
      .catch(() => {})
  }, [])  
  return (
    <>
      <div className="home">
        <div className="h-screen p-4 bg-white flex" id="banner">
          <div className="w-1/3">
            <h1 className="text-3xl">Welcome to Qoneqo's Website</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolorem labore et vel, assumenda earum provident minus quos quod mollitia reiciendis perferendis odio nobis placeat cumque magni rem natus ad.</p>
            <button className="">Show more</button>
          </div>
        </div>
        <div className="h-screen bg-neutral-700" id="about"></div>
      </div>
    </>
  );
};

export default Home;
