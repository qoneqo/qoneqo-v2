import React from 'react';
import {Link} from 'react-router-dom';
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineTags,
} from 'react-icons/ai';
import LogoImg from '../../assets/images/logo.png';

const Sidebar = () => {
  return (
    <>
      <aside className="sidebar flex flex-col w-16 h-screen bg-white">
        <ul>
          <li className="border-b h-12">
            <img src={LogoImg} alt="" />
          </li>
          <li className="group my-2 text-xl" title="Dashboard">
            <Link className="block text-center" to="/">
              <AiOutlineDashboard className="inline text-unhover group-hover:text-hover" />
            </Link>
          </li>
          <li className="group my-2 text-xl" title="Users">
            <Link className="block text-center" to="/users">
              <AiOutlineUser className="inline text-unhover group-hover:text-hover" />
            </Link>
          </li>
          <li className="group my-2 text-xl" title="Role">
            <Link className="block text-center" to="#">
              <AiOutlineTeam className="inline text-unhover group-hover:text-hover" />
            </Link>
          </li>
          <li className="group my-2 text-xl" title="Tags">
            <Link className="block text-center" to="#">
              <AiOutlineTags className="inline text-unhover group-hover:text-hover" />
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
