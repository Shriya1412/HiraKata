import React, { useState } from 'react';

const FlashcardPopup = ({ onSubmit }) => {
  const [setType, setSetType] = useState('hiragana');
  const [numberOfCards, setNumberOfCards] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(setType, parseInt(numberOfCards, 10));
  };

  return (
    <div className="popup">
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
          Number of Flashcards:
          <input
            type="number"
            value={numberOfCards}
            onChange={(e) => setNumberOfCards(e.target.value)}
            min="1"
            required
          />
        </label>
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default FlashcardPopup;
