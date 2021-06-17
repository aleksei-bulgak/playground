import React from 'react';
import Player from './components/player';
import Controls from './components/controls';
import './App.css';

function App() {
  return (
    <div className="App">
      <Player videoId="F0GBVmpWnlE" />
      <Controls />
    </div>
  );
}

export default App;
