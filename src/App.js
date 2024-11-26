import React, { useState } from 'react';
import SpotifyAuth from './components/SpotifyAuth';
import SpotifyData from './components/SpotifyData';
import HeatmapComponent from './components/HeatmapComponent';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <div>
    <div>
      <h1>Spotify Recently Played Tracks</h1>
      {!token ? <SpotifyAuth onTokenReceived={setToken} /> : <SpotifyData />}
    </div>

    <HeatmapComponent/>
    </div>


  );
};

export default App;