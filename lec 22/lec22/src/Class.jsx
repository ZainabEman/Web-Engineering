import React from 'react';
import './App.css';

function Book(props) {
  
  return (
    <div>
      <h1>{props.Bookname}!</h1>
      <h1>{props.Aurthorname}!</h1>
    </div>
  );
}

export default Book;