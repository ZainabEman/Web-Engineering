// import React from 'react';
// import './App.css';

// function New(props) {
//   console.log(props); // Logs props to the console but does not return anything

//   return (
//     <div>
//       <h1>{props.name}!</h1>
//       <h1>{props.age}!</h1>
//     </div>
//   );
// }

// export default New;


import React, { Component } from 'react';
import './App.css';

class New extends Component {
  constructor(props) {
    super(props); 
  }

  render() {
    return (
      <div>
        <h1>{this.props.name}!</h1>
        <h1>{this.props.age}!</h1>
      </div>
    );
  }
}

export default New;

