import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineTags,
} from 'react-icons/ai';
import LogoImg from '../../assets/images/logo.png';
const AppSidebar = ({className}) => {
  let pathname = useLocation().pathname;

  return (
    <>
      <aside className={`sidebar z-10 flex flex-col bg-white ${className}`}>
        <ul>
          <li className="border-b p-2 text-center h-12">
            <img className="h-full inline-block" src={LogoImg} alt="" />
          </li>
          <li className="group my-2 text-xl" title="Dashboard">
            <Link className="block text-center" to="/dashboard">
              <AiOutlineDashboard className={`inline text-unhover ${pathname === '/dashboard' && 'text-hover'} group-hover:text-hover`} />
            </Link>
          </li>
          <li className="group my-2 text-xl" title="Users">
            <Link className="block text-center" to="/dashboard/users">
              <AiOutlineUser className={`inline text-unhover ${pathname === '/dashboard/users' && 'text-hover'} group-hover:text-hover`} />
            </Link>
          </li>
          <li className="group my-2 text-xl" title="User Roles">
            <Link className="block text-center" to="#">
              <AiOutlineTeam className={`inline text-unhover ${pathname === '/dashboard/roles' && 'text-hover'} group-hover:text-hover`} />
            </Link>
          </li>
          <li className="group my-2 text-xl" title="Tags">
            <Link className="block text-center" to="#">
              <AiOutlineTags className={`inline text-unhover ${pathname === '/dashboard/tags' && 'text-hover'} group-hover:text-hover`} />
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

AppSidebar.defaultProps = {
  className: '',
};
export default AppSidebar;
