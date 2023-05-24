import React from 'react';
import SongSelector from './examples/SongSelector';
import './App.css';

function App() {
  return (
    <div>
      <header className="header">
        <h1>Checkbox Group Derived State</h1>
      </header>
      <main className="main__container">
        <SongSelector />
      </main>
    </div>
  );
}

export default App;
