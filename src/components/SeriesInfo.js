import React, { useEffect, useState } from 'react';
import '../CSS/style.css';
import { useNavigate } from 'react-router-dom';

const SeriesInfo = ({ data }) => {
const [isInMyList, setIsInMyList] = useState(false);
const userId = sessionStorage.getItem('userId');
const navigate = useNavigate();

  useEffect(() => {
    const checkIfInMyList = async () => {
      if (!userId || !data?._id) {
        console.log("⚠️ Missing userId or movie ID", { userId, movieId: data?._id });
        return;
      }
  
      try {
        const res = await fetch(`https://netflix-server-4a8a.onrender.com/api/auth/${userId}`);
        const myList = await res.json();
  
        console.log("📦 myList from server:", myList);
        console.log("🎬 current movie ID:", data._id);
  
        const isInList = myList.some(item => item._id?.toString() === data._id?.toString());
        console.log("✅ Is movie in list?", isInList);
  
        setIsInMyList(isInList);
      } catch (err) {
        console.error('❌ Failed to check MyList:', err);
      }
    };
  
    checkIfInMyList();
  }, [data, userId]);
  
  

  const handleMyListToggle = async () => {
    const url = `https://netflix-server-4a8a.onrender.com/api/auth/${data._id}`;
    try {
      const res = await fetch(url, {
        method: isInMyList ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      if (res.ok) setIsInMyList(!isInMyList);
    } catch (err) {
      console.error(` Failed to ${isInMyList ? 'remove from' : 'add to'} MyList`, err);
    }
  };

  if (!data) return null;
  return (
      <div className="modal-content">
        <div
          className="featured-movie"
          style={{ backgroundImage: `url(${data.screenshots?.[1]})` }}
        >
          <div className="featured-overlay">
            <img
              src={data.titleImage}
              alt={`${data.title} logo`}
              className="title-logo"
            />
          </div>

          <div className="featured-fade-bottom">
            <div className="featured-actions">
            <button className="review-btn" onClick={() => navigate(`/review/${data._id}`)}>
            ▶ Review
          </button>              
          <div className="right-Buttons">
              <button
                className={`add-btn ${isInMyList ? 'remove-btn' : ''}`}
                onClick={handleMyListToggle}
              >
                {isInMyList ? '-' : '+'}
              </button> 
              <button className="mute-btn">🔇</button>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="info-left">
            <div className="tags">
              <span className="tag new">New</span>
              <span>{data.seasons} Seasons </span>
              <span>{data.year}</span>
              <span className="tag hd">HD</span>
            </div>

            <div className="subTags">
              <span className="tag warnings">
                {data.warnings || 'smoking, violence'}
              </span>
            </div>

            {data.lists?.includes("top10") && data.rank && (
              <div className="top10-badge-container">
                  <div className="top10-badge">
                     <span className="top">TOP</span>
                     <span className="number">10</span>
                  </div>
                  <h3 className="rank">#{data.rank} in TV Shows Today</h3>
              </div>
            )}

            <p >{data.description}</p>
            <div className="Episodes-start">
              <h3>Episodes</h3>
              <h5>{data.title}</h5>
            </div>
            {data.episodes?.length > 0 && (
               <div className="episodes">
                  {data.episodes.map((ep, i) => (
                     <div key={i} className="episode-card">
                        <h2>{ep.number}</h2>
                        <div className="episode-thumbnail">
                           <img src={ep.image} alt={`Episode ${ep.number}`} />
                           <div className="circle-play-button">
                              <span className="play-icon">▶</span>
                           </div>
                        </div>
                        <div className="episode-text">
                            <h3>{ep.title}</h3>
                            <p className="episode-description">{ep.description}</p>
                        </div>
                        <p className="episode-time">{ep.Time}</p>
                     </div>
                  ))}
               </div>
            )}
          </div>
          <div className="info-right">
            <p><span className="label">Cast:</span> {data.cast}</p>
            <p><span className="label">Genres:</span> {data.genres || 'TV Dramas, Thrillers'}</p>
            <p><span className="label">This show is:</span> {data.type}</p>
          </div>
          
        </div>
        <div className="trailer-section">
           <h3>Trailers & More</h3>
           <div className="trailer-thumbnails">
              {data.screenshots.slice(0, 3).map((shot, i) => (
                <div className="trailer-box" key={i}>
                    <img src={shot} alt={`screenshot ${i + 1}`} />
                    <p>Season {data.seasons} Trailer {i + 1}: {data.title}</p>
                </div>
              ))}
           </div>
        </div>
        <div className="about-section">
        <h3>About {data.title}</h3>
           <p><span className="label">Director: </span> {data.Director}</p>
           <p><span className="label">Cast: </span> {data.cast}</p>
           <p><span className="label">Genres: </span> {data.genres || 'TV Dramas, Thrillers'}</p>
           <p><span className="label">This show is: </span> {data.type}</p>
           <div className="maturity-box">
              <span className="label">Maturity rating: </span>
              <span className="tv-rating">{data["Maturity rating"] || 'TV-MA'}</span>
              <span className="rating-description">{data.warnings || 'smoking, violence'}</span>
              <span className="for-adults">For Mature Audiences.</span>
           </div>
        </div>
      </div>
  );
};

export default SeriesInfo;
