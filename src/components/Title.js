import React from 'react';
import './Title.css';

function Title({ text, subtitle }) {
  return (
    <div className="title">
      {subtitle && <h2>{subtitle}</h2>}
      <h1>{text}</h1>
    </div>
  );
}

export default Title;