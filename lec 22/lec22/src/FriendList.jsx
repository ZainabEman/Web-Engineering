import React, { Component } from "react";
import Friend from "./Friend.jsx";

export class FriendList extends Component {
    constructor() {
        super();
        this.state = {
            friends: [
                { id: 1, name: "Zainab", email: "zainab@gmail.com" },
                { id: 2, name: "Sana", email: "sana@gmail.com" }
            ],
            newFriendName: "",
            newFriendEmail: ""
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
        const friends = [...this.state.friends];
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].id === friendId) {
                friends[i] = { ...friends[i], name: event.target.value };
                break;
            }
        }
        
        this.setState({
            friends: friends
        });
    };

    handleNewFriendInput = (event) => {
        this.setState({
            newFriendName: event.target.value
        });
    };

    handleNewFriendEmail = (event) => {
        this.setState({
            newFriendEmail: event.target.value
        });
    };

    addNewFriend = () => {
        if (this.state.newFriendName && this.state.newFriendEmail) {
            const newFriend = {
                id: this.state.friends.length + 1,
                name: this.state.newFriendName,
                email: this.state.newFriendEmail
            };
            
            this.setState({
                friends: [...this.state.friends, newFriend],
                newFriendName: "",
                newFriendEmail: ""
            });
        }
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
                <div className="add-friend-form">
                    <input
                        type="text"
                        value={this.state.newFriendName}
                        onChange={this.handleNewFriendInput}
                        placeholder="Enter new friend name..."
                    />
                    <input
                        type="email"
                        value={this.state.newFriendEmail}
                        onChange={this.handleNewFriendEmail}
                        placeholder="Enter new friend email..."
                    />
                    <button onClick={this.addNewFriend}>Add Friend</button>
                </div>
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
