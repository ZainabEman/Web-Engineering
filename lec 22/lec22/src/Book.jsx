import React, { Component } from 'react';
import './App.css';

class Book extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.Bookname}!</h1>
        <h1>{this.props.Aurthorname}!</h1>
      </div>
    );
  }
}

export default Book;
