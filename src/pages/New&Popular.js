import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import NavigationBar from '../components/NavigationBar';
import MovieListSection from '../components/MovieListSection';
import BigCoverPhoto from '../components/BigCoverPhoto';
import NormalPageFooter from '../components/NormalPageFooter';
import MoreInfo from '../components/MoreInfo';

const MoviesPage = () => {
  const [NewMS, setNew] = useState([]);
  const [PopularMS, setPopular] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const userId = sessionStorage.getItem('userId');

  const closeMoreInfo = () => setSelectedMovie(null);

  useEffect(() => {
   
    const fetchTopTvShows = async () => {
      try {
        const res = await fetch(`https://netflix-server-4a8a.onrender.com/api/movies`);
        const data = await res.json();
        const NewList = data.filter(m => m.lists?.includes("new") )
        .sort((a, b) => a.rank - b.rank);
        setNew(NewList);
        const PopularList = data.filter(m => m.lists?.includes("popular") ) 
        .sort((a, b) => a.rank - b.rank);
        setPopular(PopularList);
      } catch (err) {
        console.error(" Failed to fetch Movies :", err);
      }
    };


    fetchTopTvShows();
  }, [userId]);

  return (
    <div className="page-wrapper">
      <NavigationBar />
      <div className="homePage-container">
        <BigCoverPhoto openMoreInfo={setSelectedMovie} />
         
        <div className="tv-list-wrapper">
           <MovieListSection
            title="New"
            movies={NewMS}
            onMovieClick={setSelectedMovie}
           />
        </div>
        <div className="tv-list-wrapper">
           <MovieListSection
            title="Popular"
            movies={PopularMS}
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
