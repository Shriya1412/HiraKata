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
      setCurrentCardIndex(0);
    };
  
    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };
  
    const nextCard = useCallback(() => {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentCardIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % selectedCards.length;
          return newIndex;
        });
      }, 500); // This timeout should match the flip transition duration
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
        // Ensure to start with the first card after selection
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
              {currentCardIndex === selectedCards.length - 1 &&(
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