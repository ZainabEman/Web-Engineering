import React from 'react';
import './Friend.css';

const Friend = ({ friends, onInputChange, deleteFriend }) => {
    return (
        <div className='FriendList'>
            {friends.map((friend) => (
                <div key={friend.id} className='Friend'>
                    <h2>Email: {friend.email}</h2>
                    <input
                        type="text"
                        value={friend.name}
                        onChange={(event) => onInputChange(event, friend.id)}
                        placeholder="Enter name..."
                    />
                    <button onClick={() => deleteFriend(friend.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Friend;
