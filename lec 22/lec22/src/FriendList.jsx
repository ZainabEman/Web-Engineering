import React, { Component } from 'react';
import Friend from './Friend.jsx';

export class FriendList extends Component {
    constructor() {
        super();
        this.state = {
            friends: [
                { name: 'Zainab', email: 'zainab@gmail.com' },
                { name: 'Sana', email: 'sana@gmail.com' }
            ],
            inputValue: '' // Store input value in state
        };
    }

    ChangeBookState = () => {
        this.setState({
            friends: [
                { name: 'Eman', email: 'eman@gmail.com' },
                { name: 'Noor', email: 'noor@gmail.com' }
            ]
        });
    };

    changeInput = (event) => {
        this.setState({
            // friends: [
            //     { name: event.target.value, email: this.state.friends[0].email },
            //     { name: event.target.value, email: this.state.friends[1].email }
            // ]
        });
    };

    render() {
        return (
            <div>
                <Friend Name={this.state.friends[0].name} email={this.state.friends[0].email} />
                <Friend Name={this.state.friends[1].name} email={this.state.friends[1].email} />
                <button onClick={this.ChangeBookState}>Change state</button>
                <input type="text" onChange={this.changeInput} placeholder="Enter name..." />
            </div>
        );
    }
}

export default FriendList;
