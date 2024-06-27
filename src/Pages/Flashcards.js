import React, { useState, useEffect, useCallback } from 'react';
import flashcardsData from '../data/FlashcardsData';
import FlashcardPopup from './FlashcardPopup';
import './Flashcards.css';

const Flashcards = () => {
    const [selectedCards, setSelectedCards] = useState([]);
    const [showPopup, setShowPopup] = useState(true);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handlePopupSubmit = (setType, numberOfCards) => {
      let filteredCards = flashcardsData;
      if (setType !== 'both') {
        filteredCards = flashcardsData.filter(card => card.type === setType);
      }
      // Shuffle and select the specified number of cards
      const shuffledCards = filteredCards.sort(() => 0.5 - Math.random()).slice(0, numberOfCards);
      setSelectedCards(shuffledCards);
      setShowPopup(false);
    };
  
    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };
  
    const nextCard = useCallback(() => {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % selectedCards.length);
      }, 300); // This timeout should match the flip transition duration
    }, [selectedCards.length]);
  
    useEffect(() => {
      if (!showPopup) {
        nextCard(); // To start with the first card after selection
      }
    }, [showPopup, nextCard]);
  
    return (
      <div className="flashcards">
        {showPopup && <FlashcardPopup onSubmit={handlePopupSubmit} />}
        {!showPopup && selectedCards.length > 0 && (
          <div className="flashcard-container">
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
              <div className="flashcard-front">
                {selectedCards[currentCardIndex].char}
              </div>
              <div className="flashcard-back">
                {selectedCards[currentCardIndex].romanized}
              </div>
            </div>
            <button onClick={nextCard}>Next</button>
          </div>
        )}
      </div>
    );
  };
  
  export default Flashcards;