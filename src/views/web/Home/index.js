import { Link } from 'react-router-dom';
import HeaderImg from '../../../assets/images/programming-vector.jpg';
import ArticleCard from '../../../components/ArticleCard';

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="bg-white flex" id="banner">
          <div className={`w-full md:w-1/3 h-60 md:h-auto text-center flex flex-col justify-center bg-gradient-to-r from-sky-600 to-primary text-white`}>
            <p className="text-2xl md:text-3xl md:text-white">Welcome to Qoneqo's Blog</p>
            {/* <p className="text-md md:text-2xl md:text-secondary"></p> */}
            {/* <button className="text-tertiary bg-white d-inline-block w-fit mx-auto p-2 my-2 rounded font-semibold border-2 border-purple-200">Dive In</button> */}
          </div>
          <div className="hidden md:block md:w-2/3">
            <img className="-hue-rotate-30" src={`${HeaderImg}`} alt="" />
          </div>
        </div>
        <div className="bg-neutral-700 text-white flex md:flex-row flex-col items-center py-20" id="about">          
          <p className="text-3xl text-center md:p-4 md:w-1/4">About Us</p>
          <div className="p-12 md:p-4 md:w-3/4 text-justify md:pr-40">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error nemo pariatur sint fuga. Maxime nisi, neque eos a quibusdam distinctio aspernatur assumenda, possimus asperiores, culpa autem magni! Facere, velit nihil?
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error nemo pariatur sint fuga. Maxime nisi, neque eos a quibusdam distinctio aspernatur assumenda, possimus asperiores, culpa autem magni! Facere, velit nihil?
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error nemo pariatur sint fuga. Maxime nisi, neque eos a quibusdam distinctio aspernatur assumenda, possimus asperiores, culpa autem magni! Facere, velit nihil?</p>
          </div>
        </div>
        <div className="min-h-screen py-8" id="article">
          <p className="text-2xl text-center my-4">New Articles</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-10/12 mx-auto">
          {(() => {
            let el = [];
            for (let index = 0; index < 8; index++) {
              el[index] = <Link to={`/article/${index}`}><ArticleCard key={index} /></Link>;
            }
            return <>{el}</>;
          })()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
