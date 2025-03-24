import React, { Component } from 'react';
import Friend from './Friend.jsx';

export class FriendList extends Component {
    constructor() {
        super();
        this.state = {
            friends: [
                { name: 'Zainab', email: 'zainab@gmail.com' },
                { name: 'Sana', email: 'sana@gmail.com' }
            ]
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

    render() {
        return (
            <div>
                <Friend Name={this.state.friends[0].name} email={this.state.friends[0].email} />
                <Friend Name={this.state.friends[1].name} email={this.state.friends[1].email} />
                <button onClick={this.ChangeBookState}>Change state</button>
            </div>
        );
    }
}

export default FriendList;
