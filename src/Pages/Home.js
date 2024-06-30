import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';
import './Home.css';

const Home = () => {
  return (
    <div className="app">
      <header className="app-header">
        <Title text="HiraKata" subtitle="ひらカタ" />
      </header>
      <div className="button-container">
        <Link to="/flashcards"><Button label="Flashcards" /></Link>
        <Link to="/learn"><Button label="Learn" /></Link>
        <Link to="/word-creation"><Button label="Word Creation" /></Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;