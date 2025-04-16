import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import NavigationBar from '../components/NavigationBar';
import MovieListSection from '../components/MovieListSection';
import BigCoverPhoto from '../components/BigCoverPhoto';
import NormalPageFooter from '../components/NormalPageFooter';
import MoreInfo from '../components/MoreInfo';

const TVShowsPage = () => {
  const [TvShows, setTvShows] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const userId = sessionStorage.getItem('userId');

  const closeMoreInfo = () => setSelectedMovie(null);

  useEffect(() => {
   
    const fetchTopTvShows = async () => {
      try {
        const res = await fetch(`https://netflix-server-4a8a.onrender.com/api/movies`);
        const data = await res.json();
        const TvShowsList = data
        .filter(m => m.isSeries)
        .sort((a, b) => a.rank - b.rank);

        setTvShows(TvShowsList);
      } catch (err) {
        console.error(" Failed to fetch Tv Shows :", err);
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
            title="TV Shows"
            movies={TvShows}
            onMovieClick={setSelectedMovie}
           />
        </div>

        {selectedMovie && <MoreInfo movie={selectedMovie} onClose={closeMoreInfo} />}
        </div>
      <NormalPageFooter />
    </div>
  );
};

export default TVShowsPage;
