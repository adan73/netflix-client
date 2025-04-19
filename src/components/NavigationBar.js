import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/style.css';
import { FaCaretDown } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const NavigationBar = () => {
    const navigate = useNavigate();
    const userRole = sessionStorage.getItem('userRole');
    const profileAvatar = sessionStorage.getItem('selectedAvatarPng');
    const [showMenu, setShowMenu] = useState(false);
    const toggleDropdown = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };
  return (
    <div className="nav-main-container">
      <div className="nav-left-side">
        <img
          src="https://www.ais.th/content/ais/th/en_us/consumers/entertainment/streaming-app/netflix/_jcr_content/root/container_1816311984/aiscontainer/columncontrol_copy_c/content1/image.coreimg.png/1688974800164/logo-netflix.png"
          alt="Netflix Logo"
          className="netflix-logo"
          onClick={() => navigate('/home')}
        />
        <ul className="nav-links">
          <li onClick={() => navigate('/home')}>Home</li>
          <li className="tallerWords" onClick={() => navigate('/TVShowsPage')}>TV Shows</li>
          <li onClick={() => navigate('/MoviesPage')}>Movies</li>
          <li className="tallerWords" onClick={() => navigate('/New&Popular')}>New & Popular</li>
          <li className="shortWords" onClick={() => navigate('/MyListPage')}>My List</li>
          <li onClick={() => navigate('/BrowsePage')}>Browse</li>
          {userRole === 'admin' && (
            <li onClick={() => navigate('/AdminPage')} className="tallerWords">
              Add Contact
            </li>
          )}
        </ul>
      </div>

      <div className="nav-right-side">
        <IoSearch className="nav-icon-style" />
        <FaRegBell className="nav-icon-style" />
        <div className="avatar-dropdown" onClick={toggleDropdown}>
          <img src={profileAvatar} alt="avatar" className="home-avatar" />
          <FaCaretDown color='white' />
        </div>,  

        {showMenu && (
          <div className="dropdown-menu">
            <p>Account</p>
            <p>My Reviews</p>
            <p onClick={handleLogout}>Sign Out</p>
          </div>
        )}
      </div>
    </div>
  );
};

  
  export default NavigationBar;
  
