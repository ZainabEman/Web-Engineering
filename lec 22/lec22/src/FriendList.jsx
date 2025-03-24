import React, { Component } from "react";
import Friend from "./Friend.jsx";

export class FriendList extends Component {
    constructor() {
        super();
        this.state = {
            friends: [
                { name: "Zainab", email: "zainab@gmail.com" },
                { name: "Sana", email: "sana@gmail.com" }
            ],
            inputValue: "" 
        };
    }

    ChangeBookState = () => {
        this.setState({
            friends: [
                { name: "Eman", email: "eman@gmail.com" },
                { name: "Noor", email: "noor@gmail.com" }
            ]
        });
    };

    changeInput = (event) => {
        this.setState({
            inputValue: event.target.value, // Store input value
            friends: [
                { name: event.target.value, email: this.state.friends[0].email },
                { name: this.state.friends[1].name, email: this.state.friends[1].email }
            ]
        });
    };

    render() {
        return (
            <div>
                <Friend Name={this.state.friends[0].name} email={this.state.friends[0].email} />
                <Friend Name={this.state.friends[1].name} email={this.state.friends[1].email} />
                <button onClick={this.ChangeBookState}>Change state</button>
                <input
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.changeInput}
                    placeholder="Enter name..."
                />
                <p>Updated Name: {this.state.friends[0].name}</p>
            </div>
        );
    }
}

export default FriendList;
