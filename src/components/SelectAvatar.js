import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import '../CSS/style.css';

const avatarOptions = [
  '/images/red_avatar.png',
  '/images/blue_avatar.png',
  '/images/purple_avatar.png',
  '/images/orange_avatar.png',
  '/images/green_avatar.png',
  '/images/penguin-avatar.png',
  '/images/chicken-avatar.png',
  '/images/panda-avatar.png',
  '/images/robot-avatar.png',
];

const SelectAvatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch(`https://netflix-server-4a8a.onrender.com/api/avatars/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json(); 
        if (Array.isArray(data)) {
          setAvatars(data);
        } else {
          console.error('Expected array, got:', data);
          setAvatars([]);
        }
      } catch (err) {
        console.error('Failed to load avatars:', err);
      }
    };
    if (userId) fetchAvatars();
  }, [userId]);

  const handleAddAvatar = async () => {
    if (avatars.length >= 5) return;

    const randomAvatar = avatarOptions[Math.floor(Math.random() * avatarOptions.length)];
    const body = {name: 'New User', avatar: randomAvatar, userId,};
    try {
      const response = await fetch(`https://netflix-server-4a8a.onrender.com/api/avatars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setAvatars([...avatars, data]);
    } catch (err) {
      console.error('Failed to add a bew avatar:', err);
    }
  };

  const handleDeleteAvatar = async (id) => {
    try {
      await fetch(`https://netflix-server-4a8a.onrender.com/api/avatars/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAvatars(avatars.filter((avatar) => avatar._id !== id));
    } catch (err) {
      console.error('Failed to delete avatar:', err);
    }
  };

  const handleKeyDown = async (e, id) => {
    if (e.key === 'Enter') {
      const avatar = avatars.find((a) => a._id === id);
      const body = { name: avatar.name };

      try {
        const response = await fetch(`https://netflix-server-4a8a.onrender.com/api/avatars/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        await response.json();
        setEditingId(null);
      } catch (err) {
        console.error('Failed to update name:', err);
      }
    }
  };

  const handleNameChange = (e, id) => {
    setAvatars(
      avatars.map((avatar) =>
        avatar._id === id ? { ...avatar, name: e.target.value } : avatar
      )
    );
  };

  const handleAvatarClick = (avatar) => {
    sessionStorage.setItem('selectedAvatarName', avatar.name);
    sessionStorage.setItem('selectedAvatarPng', avatar.avatar);
    navigate('/home');
  };

  return (
    <div className="profile-container">
      <h2>Who's watching?</h2>
      <div className="profile-grid">
        {avatars.map((avatar) => (
          <div className="profile-card" key={avatar._id}>
            <div className="avatar-wrapper" >
              <img src={avatar.avatar} alt="avatar" className="avatar-img" onClick={() => handleAvatarClick(avatar)}/>
              <div className="delete-icon" onClick={() => handleDeleteAvatar(avatar._id)}>
                <FaTrash />
              </div>
            </div>
            {editingId === avatar._id ? (
              <input
                type="text"
                value={avatar.name}
                onChange={(e) => handleNameChange(e, avatar._id)}
                onKeyDown={(e) => handleKeyDown(e, avatar._id)}
                autoFocus
              />
            ) : (
              <p onClick={() => setEditingId(avatar._id)}>{avatar.name}</p>
            )}
          </div>
        ))}
        {avatars.length < 5 && (
          <div className="profile-card add-profile" onClick={handleAddAvatar}>
            <div className="add-profile-box">
              <div className="avatar-wrapper add">
                <span className="plus-icon">+</span>
              </div>
              <p>Add Avatar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectAvatar;
