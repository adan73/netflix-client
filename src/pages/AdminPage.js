import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../CSS/style.css';
import NormalPageFooter from '../components/NormalPageFooter';

const AdminPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    titleImage: '',
    isSeries: false,
    type: '',
    year: '',
    cast: '',
    director: '',
    maturityRating: '',
    lists: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      lists: form.lists.split(',').map(item => item.trim()),
      screenshots: [form.image, form.image, form.image],
      titleImage: form.titleImage,
    };

    try {
      const res = await fetch('https://netflix-server-4a8a.onrender.com/api/movies/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        alert('Movie/Series added!');
        setForm({
          title: '', description: '', image: '', titleImage: '', isSeries: false,
          type: '', year: '', cast: '', director: '', maturityRating: '', lists: ''
        });
      } else {
        alert(data.message || 'Failed to add content');
      }
    } catch (err) {
      console.error('❌ Error:', err);
      alert('Something went wrong');
    }
  };

  return (
    
    <div className="page-wrapper">
      <NavigationBar />
      <div className="adminPage">
    <div className="admin-form">
      <h2>Add New Movie / Series</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="image" placeholder="Cover Image URL" value={form.image} onChange={handleChange} required />
        <input name="titleImage" placeholder="Title Image URL" value={form.titleImage} onChange={handleChange} />
        <input name="type" placeholder="Genre / Type" value={form.type} onChange={handleChange} />
        <input name="year" placeholder="Year" value={form.year} onChange={handleChange} />
        <input name="cast" placeholder="Cast" value={form.cast} onChange={handleChange} />
        <input name="director" placeholder="Director" value={form.director} onChange={handleChange} />
        <input name="maturityRating" placeholder="Maturity Rating" value={form.maturityRating} onChange={handleChange} />
        <input name="lists" placeholder="Lists (comma separated)" value={form.lists} onChange={handleChange} />
        <label>
          <input type="checkbox" name="isSeries" checked={form.isSeries} onChange={handleChange} />
          Is this a series?
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
    <NormalPageFooter />
    </div>
    </div>
  );
};

export default AdminPage;
