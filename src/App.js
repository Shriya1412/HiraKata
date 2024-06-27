import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Flashcards from './Pages/Flashcards';
import Learn from './Pages/Learn';
import WordCreation from './Pages/WordCreation';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/word-creation" element={<WordCreation />} />
        </Routes>
    </Router>
  );
}
export default App;