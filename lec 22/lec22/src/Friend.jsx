import React from 'react';
import './Friend.css';

const Friend = ({ friends, change, deleteFriend }) => {
    return (
        <div className='FriendList'>
            {friends.map((friend) => (
                <div key={friend.id} className='Friend'>
                    <h1 onClick={() => change(friend.id)}>Name: {friend.name}</h1>
                    <h2>Email: {friend.email}</h2>
                    <button onClick={() => deleteFriend(friend.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Friend;
