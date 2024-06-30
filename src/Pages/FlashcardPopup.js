import React, { useState } from 'react';
import './FlashcardPopup.css';

const lines = ['vowels', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'];

const FlashcardPopup = ({ onSubmit }) => {
  const [setType, setSetType] = useState('hiragana');
  const [selectedLines, setSelectedLines] = useState([]);
  const [numberOfCards, setNumberOfCards] = useState('');
  const [lineOption, setLineOption] = useState('random');

  const handleLineChange = (line) => {
    setSelectedLines(prevLines =>
      prevLines.includes(line) ? prevLines.filter(l => l !== line) : [...prevLines, line]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lineOption === 'random') {
      onSubmit(setType, 'random', numberOfCards);
    } else if (lineOption === 'custom') {
      onSubmit(setType, 'custom', selectedLines);
    }
  };

  return (
    <div className="popup">
      <h2>Create your Set</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Script:
          <select value={setType} onChange={(e) => setSetType(e.target.value)}>
            <option value="hiragana">Hiragana</option>
            <option value="katakana">Katakana</option>
            <option value="both">Both</option>
          </select>
        </label>
        <label>
          Line Option:
          <select value={lineOption} onChange={(e) => setLineOption(e.target.value)}>
            <option value="random">Random</option>
            <option value="custom">Custom</option>
          </select>
        </label>
        {lineOption === 'custom' && (
          <div className="lines-selection">
            {lines.map(line => (
              <label key={line} className="line-checkbox">
                <input
                  type="checkbox"
                  value={line}
                  onChange={() => handleLineChange(line)}
                />
                {line}
              </label>
            ))}
          </div>
        )}
        {lineOption === 'random' && (
          <label>
            Number of Flashcards:
            <input
              type="number"
              value={numberOfCards}
              onChange={(e) => setNumberOfCards(e.target.value)}
              min="1"
              required
            />
          </label>
        )}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default FlashcardPopup;
