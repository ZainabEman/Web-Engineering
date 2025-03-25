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
            inputValue: "" 
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

    changeInput = (event) => {
        this.setState({
            inputValue: event.target.value,
            friends: [
                { id: this.state.friends[0].id, name: event.target.value, email: this.state.friends[0].email },
                { id: this.state.friends[1].id, name: this.state.friends[1].name, email: this.state.friends[1].email }
            ]
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
                <Friend friends={this.state.friends} change={this.changeInput} deleteFriend={this.deleteFriend} />
                <button onClick={this.ChangeBookState}>Change state</button>
                <input
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.changeInput}
                    placeholder="Enter name..."
                />
                <p>Updated Name: {this.state.friends[0]?.name}</p>
            </div>
        );
    }
}

export default FriendList;
