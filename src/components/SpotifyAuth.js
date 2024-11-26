import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CLIENT_ID = '';
const CLIENT_SECRET = '';
const REDIRECT_URI = 'http://localhost:3000/';
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-read-recently-played user-top-read`;


const SpotifyAuth = ({ onTokenReceived }) => {
  const [authCode, setAuthCode] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('code')) {
      setAuthCode(queryParams.get('code'));
    }
  }, []);

  const exchangeCodeForToken = async () => {
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          code: authCode,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code',
        }),
        {
          headers: {
            Authorization: `Basic ${btoa(CLIENT_ID + ':' + CLIENT_SECRET)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const accessToken = response.data.access_token;
      localStorage.setItem('access_token', accessToken);
      onTokenReceived(accessToken);
    } catch (error) {
      console.error('Error exchanging code for token:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (authCode) {
      exchangeCodeForToken();
    }
  }, [authCode]);

  return (
    <div>
      {!authCode ? (
        <a href={AUTH_URL}>Login with Spotify</a>
      ) : (
        <p>Authenticated! Fetching your data...</p>
      )}
    </div>
  );
};

export default SpotifyAuth;