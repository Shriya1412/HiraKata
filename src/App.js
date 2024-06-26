import React from 'react';
import './App.css';

import Title from './components/Title';
import Button from './components/Button';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <Title text="HiraKata" subtitle="ひらカタ" />
      </header>
      <div className="button-container">
        <Button label="Learn" />
        <Button label="Word Creation" />
        <Button label="Sentences" />
      </div>
    </div>
  );
}

export default App;
