import React, {useState} from 'react';
import { AiOutlineSearch, AiOutlineMore, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai';
import dp from './../../assets/images/user.jpg';
import './index.scss';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
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
        <div className="flex items-center justify-center text-sm text-unhover h-full">
          <img className="h-full rounded-[50%]" src={dp} alt="" />
          <span className="mx-1 text-black">Admin</span>
          <div className="relative h-full flex items-center">
            <AiOutlineMore onClick={handleShowMenu} className="text-xl cursor-pointer hover:text-black" />
            <div className={`more ${!showMenu && 'hidden'} w-32 absolute right-[-0.5rem] top-7 bg-white px-3 py-2`}>
              <ul>
                <li className="py-2 group">
                  <a className="block hover:text-hover" href="#">
                    <AiOutlineSetting className="inline-block mr-1" />
                    Settings
                  </a>
                </li>
                <li className="py-2 group">
                  <a className="block hover:text-hover" href="#">
                    <AiOutlineLogout className="inline-block mr-1" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
