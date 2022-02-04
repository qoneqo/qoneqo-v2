import React, {useState, useEffect, useRef, useContext } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { AiOutlineSearch, AiOutlineMore, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';
import dp from './../../assets/images/user.jpg';
import Context from '../../views/Context';
import { useNavigate } from 'react-router';


const AppHeader = () => {
  const navigate = useNavigate();
  const { context } = useContext(Context);
  const ref = useRef(null);
  const [showPanel, setShowPanel] = useState(false);
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleShowMenu = () => {
    setShowPanel(!showPanel);
  }

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShowPanel(false);
    } 
  };

  const handleLogout = () => {
    axios.post('http://localhost:9999/auth/logout')
    .then((data) => {
      navigate('/');
    })
    .catch(() => {})
  }
  return (
    <>
      <header className="header p-2 flex h-12 items-center justify-between bg-white border-b">
        <div className="relative flex items-center">
          <AiOutlineSearch className="text-lg absolute left-1 bottom-1/2 translate-y-1/2" />
          <input
            className="search p-1 pl-6 text-xs rounded-md bg-content-layout"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="flex text-sm text-unhover h-full">
          <div className="h-full sm:flex hidden items-center justify-center">
            <img className="h-full rounded-[50%]" src={dp} alt="" />
            <span className="mx-1 text-black">{ context.userName }</span>
          </div>
          <div ref={ref} className="relative h-full flex items-center">
            <AiOutlineMore onClick={handleShowMenu} className="text-xl cursor-pointer hover:text-black" />
            <div className={`more ${!showPanel && 'hidden'} w-32 absolute right-[-0.5rem] top-7 bg-white px-3 py-2`}>
              <div className="sm:hidden flex relative text-center items-center flex-col h-20 border-b py-1">
                <img className="h-full rounded-[50%]" src={dp} alt="" />
                <span className="mx-1 text-black">{ context.userName }</span>
              </div>
              <ul>
                <li className="py-2 group">
                  <Link className="block hover:text-hover" to="#">
                    <AiOutlineSetting className="inline-block mr-1" />
                    Settings
                  </Link>
                </li>
                <li className="py-2 group block hover:text-hover cursor-pointer" onClick={handleLogout}>
                  <AiOutlineLogout className="inline-block mr-1" />
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppHeader;
