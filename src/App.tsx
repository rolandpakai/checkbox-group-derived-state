import React from 'react';
import SongSelector from './components/SongSelector';
import './App.css';

function App() {
  return (
    <div>
      <header className="header">
        <h1>Derived State</h1>
      </header>
      <main className="main__container">
        <SongSelector />
      </main>
    </div>
  );
}

export default App;
