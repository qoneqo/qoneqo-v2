import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineTeam,
  AiOutlineAppstore,
} from 'react-icons/ai';
import Context from '../../views/Context';
import LogoImg from '../../assets/images/logo.png';

const AppSidebar = ({ className, navCollapse }) => {
  let pathname = useLocation().pathname;
  const { context } = useContext(Context);

  return (
    <>
      <aside className={`sidebar bg-white z-10 flex flex-col ${navCollapse ? 'w-44' : ''}`}>
        <ul>
          <li className="border-b p-2 text-center h-12 flex items-center">
            <img className="h-full inline-block pr-2" src={LogoImg} alt="" />
            { navCollapse && <span className="mx-1 leading-3">{ context?.appListSelected?.name || 'Qoneqo' }</span>}            
          </li>
          { navCollapse && <li className="px-4 mt-4 text-xs text-unhover"> Dashboard </li> }
          <li className="group my-2 text-xl" title="Dashboard">
            <Link className={`block ${navCollapse ?  'text-left pl-4' : 'text-center'}`} to="/dashboard">
              <AiOutlineDashboard className={`inline text-unhover ${pathname === '/dashboard' && 'text-hover'} group-hover:text-hover`} />
              { navCollapse && <span className={`mx-1 text-sm text-unhover ${pathname === '/dashboard' && 'text-hover'} group-hover:text-hover`}>Dashboard</span> }
            </Link>
          </li>
          { navCollapse && <li className="px-4 mt-4 text-xs text-unhover"> Core Modules </li> }
          <li className="group my-2 text-xl" title="Apps">
            <Link className={`block ${navCollapse ?  'text-left pl-4' : 'text-center'}`} to="/dashboard/apps">
              <AiOutlineAppstore className={`inline text-unhover ${/^\/dashboard\/apps/.test(pathname) && 'text-hover'} group-hover:text-hover`} />
              { navCollapse && <span className={`mx-1 text-sm text-unhover ${/^\/dashboard\/apps/.test(pathname) && 'text-hover'} group-hover:text-hover`}>Apps</span> }
            </Link>
          </li>
          <li className="group my-2 text-xl" title="Users">
            <Link className={`block ${navCollapse ?  'text-left pl-4' : 'text-center'}`} to="/dashboard/users">
              <AiOutlineUser className={`inline text-unhover ${/^\/dashboard\/users/.test(pathname) && 'text-hover'} group-hover:text-hover`} />
              { navCollapse && <span className={`mx-1 text-sm text-unhover ${/^\/dashboard\/users/.test(pathname) && 'text-hover'} group-hover:text-hover`}>Users</span> }
            </Link>
          </li>
          <li className="group my-2 text-xl" title="User Roles">
            <Link className={`block ${navCollapse ?  'text-left pl-4' : 'text-center'}`} to="/dashboard/roles">
              <AiOutlineTeam className={`inline text-unhover ${/^\/dashboard\/roles/.test(pathname) && 'text-hover'} group-hover:text-hover`} />
              { navCollapse && <span className={`mx-1 text-sm text-unhover ${/^\/dashboard\/roles/.test(pathname) && 'text-hover'} group-hover:text-hover`}>Roles</span> }
            </Link>
          </li>
          <li className="group my-2 text-xl" title="Modules">
            <Link className={`block ${navCollapse ?  'text-left pl-4' : 'text-center'}`} to="/dashboard/modules">
              <AiOutlineAppstore className={`inline text-unhover ${/^\/dashboard\/modules/.test(pathname) && 'text-hover'} group-hover:text-hover`} />
              { navCollapse && <span className={`mx-1 text-sm text-unhover ${/^\/dashboard\/modules/.test(pathname) && 'text-hover'} group-hover:text-hover`}>Modules</span> }
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
