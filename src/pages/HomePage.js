import React from 'react';
import '../CSS/style.css'; 

const HomePage = () => {
  const profileName = sessionStorage.getItem('selectedAvatarName');
  const profileAvatar = sessionStorage.getItem('selectedAvatarPng');
  
  return (
    <div className="homePage-container">
      <img src={profileAvatar} alt="avatar" className="home-avatar" />
      <h1 className="home-name">{profileName}</h1>
    </div>
  );
};

export default HomePage;
