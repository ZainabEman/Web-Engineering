import React, { Component } from "react";
import Friend from "./Friend.jsx";

export class FriendList extends Component {
    constructor() {
        super();
        this.state = {
            friends: [
                { id: 1, name: "Zainab", email: "zainab@gmail.com" },
                { id: 2, name: "Sana", email: "sana@gmail.com" }
            ]
        };
    }

    ChangeBookState = () => {
        this.setState({
            friends: [
                { id: 3, name: "Eman", email: "eman@gmail.com" },
                { id: 4, name: "Noor", email: "noor@gmail.com" }
            ]
        });
    };

    handleInputChange = (event, friendId) => {
        const updatedFriends = this.state.friends.map(friend => {
            if (friend.id === friendId) {
                return { ...friend, name: event.target.value };
            }
            return friend;
        });
        
        this.setState({
            friends: updatedFriends
        });
    };

    deleteFriend = (id) => {
        const updatedFriends = this.state.friends.filter(friend => friend.id !== id);
        this.setState({
            friends: updatedFriends
        });
    };

    render() {
        return (
            <div>
                <Friend 
                    friends={this.state.friends} 
                    onInputChange={this.handleInputChange} 
                    deleteFriend={this.deleteFriend} 
                />
                <button onClick={this.ChangeBookState}>Change state</button>
            </div>
        );
    }
}

export default FriendList;
