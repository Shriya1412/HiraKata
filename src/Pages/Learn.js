import React, { useState, useEffect } from 'react';
import flashcardsData from '../data/FlashcardsData';
import FlashcardPopup from './FlashcardPopup';
import './Learn.css';
import './Flashcards.css';

const lineMappings = {
  'vowels': ['a', 'e', 'i', 'o', 'u'],
  'k': ['ka', 'ki', 'ku', 'ke', 'ko'],
  's': ['sa', 'shi', 'su', 'se', 'so'],
  't': ['ta', 'chi', 'tsu', 'te', 'to'],
  'n': ['na', 'ni', 'nu', 'ne', 'no'],
  'h': ['ha', 'hi', 'fu', 'he', 'ho'],
  'm': ['ma', 'mi', 'mu', 'me', 'mo'],
  'y': ['ya', 'yu', 'yo'],
  'r': ['ra', 'ri', 'ru', 're', 'ro'],
  'w': ['wa', 'wo', 'n']
};

const Learn = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false); // State to track if answer has been submitted
  const [isFlipping, setIsFlipping] = useState(false);

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
      filteredCards = filteredCards.filter(card => {
        // Check if the card's type matches setType and its romanized form is in any of the selectedLines arrays
        return (setType === 'both' || card.type === setType) &&
          selectedLines.some(line =>
            lineMappings[line] && lineMappings[line].includes(card.romanized)
          );
      });
      setSelectedCards(filteredCards);
    }

    setShowPopup(false);
    setCurrentCardIndex(0);
    setIsCorrect(null);
    setUserInput('');
    setCorrectCount(0);
    setIncorrectCount(0);
    setShowStats(false);
    setAnswerSubmitted(false); // Reset answerSubmitted state
  };

  const handleInputChange = (e) => {
    if (!answerSubmitted) { // Only update userInput if answer hasn't been submitted
      setUserInput(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentCard = selectedCards[currentCardIndex];
    const isAnswerCorrect = userInput.toLowerCase() === currentCard.romanized;
    setIsCorrect(isAnswerCorrect);
    setAnswerSubmitted(true); // Set answerSubmitted to true after submitting

    if (isAnswerCorrect) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
    }
  };

  const nextCard = () => {
    if (currentCardIndex < selectedCards.length - 1) {
      setIsFlipping(true);
      setTimeout(() => {
        setIsFlipping(false);
        setUserInput('');
        setIsCorrect(null);
        setCurrentCardIndex(currentCardIndex + 1);
        setAnswerSubmitted(false);
      }, 600); // Adjust this delay to match your flip animation duration
    } else {
      setShowStats(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && userInput.trim() !== '' && isCorrect !== null) {
      nextCard();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [userInput, isCorrect]);

  const redoSet = () => {
    setCurrentCardIndex(0);
    setIsCorrect(null);
    setUserInput('');
    setCorrectCount(0);
    setIncorrectCount(0);
    setShowStats(false);
    setAnswerSubmitted(false); // Reset answerSubmitted state
  };

  const pickNewSet = () => {
    setShowPopup(true);
    setSelectedCards([]);
    setShowStats(false);
    setAnswerSubmitted(false); // Reset answerSubmitted state
  };

  return (
    <div className="flashcards">
      {showPopup && <FlashcardPopup onSubmit={handlePopupSubmit} />}
      {!showPopup && selectedCards.length > 0 && !showStats && (
        <div className="flashcard-container">
          <div className={`flashcard ${isCorrect !== null && !isFlipping ? 'flipped' : ''}`}>
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
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Enter romanization"
                required
                disabled={answerSubmitted} // Disable input if answer has been submitted
              />
              {isCorrect !== null && (
                <span className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                  {isCorrect ? '✓' : '✗'}
                </span>
              )}
            </div>
          </form>
          <button
            onClick={nextCard}
            disabled={userInput.trim() === '' || isCorrect === null}
            className="next-button">
            Next
          </button>
        </div>
      )}
      {showStats && (
        <div className="stats-container">
          <h2>Stats</h2>
          <div className="stat-item">
            <p>Correct:</p>
            <p className="stat-count">{correctCount}</p>
          </div>
          <div className="stat-item">
            <p>Incorrect:</p>
            <p className="stat-count">{incorrectCount}</p>
          </div>
          <button onClick={redoSet} className="redo-button">Redo Same Set</button>
          <button onClick={pickNewSet} className="new-set-button">Pick New Set</button>
        </div>
      )}
    </div>
  );
};

export default Learn;
