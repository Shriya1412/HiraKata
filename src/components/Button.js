import React from 'react';
import './Button.css'; // Import your CSS file for the button

function Button({ label }) {
  return (
    <button className="button">
      {label}
    </button>
  );
}

export default Button;