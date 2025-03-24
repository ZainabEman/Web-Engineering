import React from 'react';
import './Friend.css'; // Corrected import, added .css extension

const Friend = (props) => {
    return (
        <div className='Friend'>
            <h1 onClick={props.change}>Name: {props.Name}</h1>
            <h2>Email: {props.email}</h2>
        </div>
    );
};

export default Friend;
