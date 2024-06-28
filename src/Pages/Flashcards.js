import React, { useState, useEffect, useCallback } from 'react';
import flashcardsData from '../data/FlashcardsData';
import FlashcardPopup from './FlashcardPopup';
import './Flashcards.css';

const Flashcards = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filterCardsByLines = (cards, lines) => {
    return cards.filter(card => {
      // Check for vowels
      if (lines.includes('vowels') && ['a', 'e', 'i', 'o', 'u'].includes(card.romanized)) {
        return true;
      }
      // Check for t line with chi exception
      if (lines.includes('t') && card.romanized === 'chi') {
        return true;
      }
      // Check for w line with n exception
      if (lines.includes('w') && card.romanized === 'n') {
        return true;
      }
      // Default filtering
      return lines.some(line => card.romanized.startsWith(line));
    });
  };

  const handlePopupSubmit = (setType, lineOption, arg3) => {
    let filteredCards = flashcardsData;
    if (setType !== 'both') {
      filteredCards = flashcardsData.filter(card => card.type === setType);
    }

    if (lineOption === 'random') {
      const numberOfCards = parseInt(arg3, 10);
      const shuffledCards = filteredCards.sort(() => 0.5 - Math.random()).slice(0, numberOfCards);
      setSelectedCards(shuffledCards);
    } else if (lineOption === 'custom') {
      const selectedLines = arg3;
      filteredCards = filterCardsByLines(filteredCards, selectedLines);
      setSelectedCards(filteredCards);
    }

    setShowPopup(false);
    setCurrentCardIndex(0);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % selectedCards.length);
    }, 500);
  }, [selectedCards.length]);

  const handleRedo = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const handleNewSet = () => {
    setShowPopup(true);
    setSelectedCards([]);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  useEffect(() => {
    if (!showPopup && selectedCards.length > 0 && currentCardIndex === 0) {
      setIsFlipped(false);
    }
  }, [showPopup, selectedCards.length, currentCardIndex]);

  return (
    <div className="flashcards">
      {showPopup && <FlashcardPopup onSubmit={handlePopupSubmit} />}
      {!showPopup && selectedCards.length > 0 && (
        <div className="flashcard-container">
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="flashcard-front">
              <div className="counter">
                {currentCardIndex + 1}/{selectedCards.length}
              </div>
              {selectedCards[currentCardIndex].char}
            </div>
            <div className="flashcard-back">
              <div className="counter">
                {currentCardIndex + 1}/{selectedCards.length}
              </div>
              {selectedCards[currentCardIndex].romanized}
            </div>
          </div>
          <div className="controls">
            {currentCardIndex < selectedCards.length - 1 && (
              <button id="next" onClick={nextCard}>Next</button>
            )}
            {currentCardIndex === selectedCards.length - 1 && (
              <div className="end-options-container">
                <div className="end-options">
                  <button onClick={handleRedo}>Redo Same Set</button>
                  <button onClick={handleNewSet}>Pick New Set</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
