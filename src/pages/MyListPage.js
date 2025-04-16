import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import NavigationBar from '../components/NavigationBar';
import MovieListSection from '../components/MovieListSection';
import BigCoverPhoto from '../components/BigCoverPhoto';
import NormalPageFooter from '../components/NormalPageFooter';
import MoreInfo from '../components/MoreInfo';

const MoviesPage = () => {
  const [UserMyList, setMyList] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const userId = sessionStorage.getItem('userId');

  const closeMoreInfo = () => setSelectedMovie(null);

  useEffect(() => {
    const fetchMyList = async () => {
      try {
        const res = await fetch(`https://netflix-server-4a8a.onrender.com/api/auth/${userId}`);
        const data = await res.json();
        const MyLists = data.reverse();
        setMyList(MyLists);
      } catch (err) {
        console.error(" Failed to fetch My List:", err);
      }
    };


    fetchMyList();
  }, [userId]);

  return (
    <div className="page-wrapper">
      <NavigationBar />
      <div className="homePage-container">
        <BigCoverPhoto openMoreInfo={setSelectedMovie} />
         
        <div className="tv-list-wrapper">
           <MovieListSection
            title="My List"
            movies={UserMyList}
            onMovieClick={setSelectedMovie}
           />
        </div>

        {selectedMovie && <MoreInfo movie={selectedMovie} onClose={closeMoreInfo} />}
        </div>
      <NormalPageFooter />
    </div>
  );
};

export default MoviesPage;
