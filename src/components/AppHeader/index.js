import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  AiOutlineSearch,
  AiOutlineMore,
  AiOutlineSetting,
  AiOutlineLogout,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from 'react-icons/ai';
import dp from './../../assets/images/user.jpg';
import Context from '../../views/Context';
import { useNavigate } from 'react-router';

const AppHeader = ({ handleNavCollapse: [navCollapse, handleNavCollapse] }) => {
  const navigate = useNavigate();
  const { context, setContext } = useContext(Context);
  const ref = useRef(null);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/apps`)
      .then(({ data }) => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/filter/get-filter`)
          .then(({ data: data2 }) => {
            setContext((prev) => ({
              ...prev,
              appsList: data,
              appListSelected: data2.app_list_selected,
            }));
          })
          .catch(() => {});
      })
      .catch(() => {});
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleShowMenu = () => {
    setShowPanel(!showPanel);
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShowPanel(false);
    }
  };

  const handleSetFilter = (e) => {
    const selectedId = Number(e.target.value);
    setContext((prev) => ({
      ...prev,
      appListSelected: prev.appsList.find((val) => val.id === selectedId),
    }));
    axios.post(`${process.env.REACT_APP_API_URL}/filter/set-filter`, {
      app_list_selected: context.appsList.find((val) => val.id === selectedId),
    });
  };

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/logout`)
      .then((data) => {
        setContext(null);
        navigate('/');
      })
      .catch(() => {});
  };
  
  return (
    <>
      <header className="header p-2 flex h-12 items-center justify-between bg-white border-b">
        <div className="flex">
          <button className="bg-white p-2 pl-0" onClick={handleNavCollapse}>
            {navCollapse ? <AiOutlineDoubleLeft /> : <AiOutlineDoubleRight />}
          </button>
          <div className="rounded-md my-auto flex items-center ml-1 mr-4">
            <label
              htmlFor="selected-apps"
              className="cursor-pointer text-sm m-auto p-1"
            >
              Choose apps
            </label>
            <select
              id="selected-apps"
              className="cursor-pointer items-center p-1 h-min text-xs rounded-md bg-content-layout"
              value={context?.appListSelected?.id}
              onChange={handleSetFilter}
            >
              <option value="">All</option>
              {context?.appsList?.map((val) => (
                <option key={`appsList-${val.id}`} value={val.id}>
                  {val.name}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="my-auto relative flex items-center">
            <AiOutlineSearch className="text-lg absolute left-1 bottom-1/2 translate-y-1/2" />
            <input
              className="search p-1 pl-6 text-xs rounded-md bg-content-layout"
              type="text"
              placeholder="Search"
            />
          </div> */}
        </div>
        <div className="flex text-sm text-unhover h-full">
          <div className="h-full sm:flex hidden items-center justify-center">
            <img className="h-full rounded-[50%]" src={dp} alt="" />
            <span className="mx-1 text-black">{context?.userName}</span>
          </div>
          <div ref={ref} className="relative h-full flex items-center">
            <AiOutlineMore
              onClick={handleShowMenu}
              className="text-xl cursor-pointer hover:text-black"
            />
            <div
              className={`more ${
                !showPanel && 'hidden'
              } w-32 absolute right-[-0.5rem] top-7 bg-white px-3 py-2`}
            >
              <div className="sm:hidden flex relative text-center items-center flex-col h-20 border-b py-1">
                <img className="h-full rounded-[50%]" src={dp} alt="" />
                <span className="mx-1 text-black">{context?.userName}</span>
              </div>
              <ul>
                <li className="py-2 group">
                  <Link className="block hover:text-hover" to="#">
                    <AiOutlineSetting className="inline-block mr-1" />
                    Settings
                  </Link>
                </li>
                <li
                  className="py-2 group block hover:text-hover cursor-pointer"
                  onClick={handleLogout}
                >
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
