import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logoImg from './../../assets/images/logo.png';

const WebHeader = () => {
  const pathname = useLocation().pathname;
  return (
    <>
      <header className="h-10 bg-white">
        <nav className="h-full py-2 px-4 flex">
          <div className="h-full flex flex-none">
            <img className="h-full" src={logoImg} alt="" />
            <span className="mx-2 text-primary">Qoneqo</span>
          </div>
          <div className="h-full flex-auto flex items-center justify-end">
            <Link className={`px-4 hover:text-primary ${pathname === '/' && 'text-primary'}`} to="/">Home</Link>
            <Link className={`px-4 hover:text-primary ${pathname === '/articles' && 'text-primary'}`} to="/articles">Articles</Link>
            <Link className={`px-4 hover:text-primary ${pathname === '/login' && 'text-primary'}`} to="/login">Login</Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default WebHeader;
