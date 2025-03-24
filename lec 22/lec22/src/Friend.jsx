import React from 'react';

const Friend = (props) => {
    return (
        <>
            <h1>Name: {props.Name}</h1>
            <h2>Email: {props.email}</h2>
        </>
    );
};

export default Friend;
