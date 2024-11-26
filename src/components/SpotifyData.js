import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpotifyData = () => {
  const [recentTracks, setRecentTracks] = useState([]);
  const [topTracks, setTopTracks] = useState([]);

  // Fetch Recently Played Tracks
  const fetchRecentlyPlayed = async (accessToken) => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setRecentTracks(response.data.items);
    } catch (error) {
      console.error('Error fetching recently played tracks:', error.response?.data || error.message);
    }
  };

  // Fetch Top Tracks
  const fetchTopTracks = async (accessToken) => {
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTopTracks(response.data.items);
    } catch (error) {
      console.error('Error fetching top tracks:', error.response?.data || error.message);
    }
  };

  // Use access token from local storage
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      fetchRecentlyPlayed(accessToken);
      fetchTopTracks(accessToken);
    } else {
      console.error('No access token found.');
    }
  }, []);

  return (
    <div>
      <h2>Recently Played Tracks</h2>
      {recentTracks.length === 0 ? (
        <p>No recently played tracks available.</p>
      ) : (
        <ul>
          {recentTracks.map((track, index) => (
            <li key={index}>
              <strong>{track.track.name}</strong> by {track.track.artists[0].name}
              <br />
              <img src={track.track.album.images[0]?.url} alt="Album cover" width="100" />
            </li>
          ))}
        </ul>
      )}

      <h2>Top Tracks</h2>
      {topTracks.length === 0 ? (
        <p>No top tracks available.</p>
      ) : (
        <ul>
          {topTracks.map((track, index) => (
            <li key={index}>
              <strong>{track.name}</strong> by {track.artists[0].name}
              <br />
              <img src={track.album.images[0]?.url} alt="Album cover" width="100" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SpotifyData;
