import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import NavigationBar from '../components/NavigationBar';
import BigCoverPhoto from '../components/BigCoverPhoto';
import MovieListSection from '../components/MovieListSection';
import Top10ListSection from '../components/Top10ListSection';
import NormalPageFooter from '../components/NormalPageFooter';
import MoreInfo from '../components/MoreInfo';

const HomePage = () => {
  const [myList, setMyList] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [animationMovies, setAnimationMovies] = useState([]);
  const [top10Movies, setTop10Movies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const userId = sessionStorage.getItem('userId');

  const closeMoreInfo = () => setSelectedMovie(null);

  useEffect(() => {
    const fetchMyList = async () => {
      try {
        const res = await fetch(`https://netflix-server-4a8a.onrender.com/api/auth/${userId}`);
        const data = await res.json();
        const recent10 = data.reverse().slice(0, 10);
        setMyList(recent10);
      } catch (err) {
        console.error(" Failed to fetch My List:", err);
      }
    };

    const fetchTop10List = async () => {
      try {
        const res = await fetch(`https://netflix-server-4a8a.onrender.com/api/movies`);
        const data = await res.json();
        const top10List = data
        .filter(m => m.lists?.includes("top10") && !m.isSeries) 
        .sort((a, b) => a.rank - b.rank) 
          .slice(0, 10);
        setTop10Movies(top10List);
      } catch (err) {
        console.error(" Failed to fetch Top 10:", err);
      }
    };

    const fetchNewMovies = async () => {
      try {
        const res = await fetch(`https://netflix-server-4a8a.onrender.com/api/movies`);
        const data = await res.json();
        const newMS = data.filter(m => m.lists?.includes("new")).slice(0, 10);
        setNewMovies(newMS);
      } catch (err) {
        console.error(" Failed to fetch New Movies/seres:", err);
      }
    };
    const fetchAnimationMovies = async () => {
      try {
        const res = await fetch(`https://netflix-server-4a8a.onrender.com/api/movies`);
        const data = await res.json();
        const animationMS = data.filter(m => m.lists?.includes("animation")).slice(0, 10);
        setAnimationMovies(animationMS);
      } catch (err) {
        console.error(" Failed to fetch animation Movies:", err);
      }
    };
    if (userId) fetchMyList();
    fetchTop10List();
    fetchNewMovies();
    fetchAnimationMovies();
  }, [userId]);

  return (
    <div className="page-wrapper">
      <NavigationBar />
      <div className="homePage-container">
        <BigCoverPhoto openMoreInfo={setSelectedMovie} />
         
        <MovieListSection
          title="New On Netflix"
          movies={newMovies}
          onMovieClick={setSelectedMovie}
        />
         <Top10ListSection
          title="Top 10 movies in the U.S. Today"
          movies={top10Movies}
          onMovieClick={setSelectedMovie}
        />
        <MovieListSection
          title="Animation"
          movies={animationMovies}
          onMovieClick={setSelectedMovie}
        />
        <MovieListSection
          title="My List"
          movies={myList}
          onMovieClick={setSelectedMovie}
        />
        {selectedMovie && <MoreInfo movie={selectedMovie} onClose={closeMoreInfo} />}
      </div>
      <NormalPageFooter />
    </div>
  );
};

export default HomePage;
