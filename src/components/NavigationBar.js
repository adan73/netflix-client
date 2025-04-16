import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/style.css';
import { FaCaretDown } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const NavigationBar = () => {
    const navigate = useNavigate();
  
    const profileAvatar = sessionStorage.getItem('selectedAvatarPng');

  
    return (
       <div className="nav-main-container">
           <div className="nav-left-side">
                <img src="images/logo.png" alt="Netflix Logo" className="netflix-logo"  onClick={() => navigate('/home')}/>
                <ul className="nav-links">
                 <li onClick={() => navigate('/home')}>Home</li>
                 <li className="tallerWords" onClick={() => navigate('/TVShowsPage')}>TV Shows</li>
                 <li onClick={() => navigate('/MoviesPage')}>Movies</li>
                 <li className="tallerWords" onClick={() => navigate('/New&Popular')}>New & Popular</li>
                 <li className="shortWords" onClick={() => navigate('/MyListPage')}>My List</li>
                 <li>Browse</li>
                </ul>
            </div>
            <div className="nav-right-side">
                <IoSearch className="nav-icon-style"  />
                <FaRegBell className="nav-icon-style" />
                <img src={profileAvatar} alt="avatar" className="home-avatar" />
                <div className="more-nav"><FaCaretDown color='white'/> </div>
            </div>
       </div>
    );
  };
  
  export default NavigationBar;
  
