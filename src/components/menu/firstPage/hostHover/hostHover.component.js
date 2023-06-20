import React from "react";
import StartFirebase from '../../../../utils/firebaseConfig/index';
import { ref, set, get, update, remove, child, onDisconnect } from 'firebase/database';
import { useState } from 'react';
import "../card.style.css";

export class HostHover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            db: null,
            username: '',
            players: [],
            roomNumber: '',
            isInRoom: false,
            isAdmin: false,
            gameInProgress: false,
            deleteTimeout: null,
        }
        this.interface = this.interface.bind(this);
    }

    componentDidMount() {
        this.setState({
            db: StartFirebase(),
        })
    }

    render() {
        return (
            <>
                <div class="container">
                    <div class="cardCard">
                        <div class="cardTitle">Host a game</div>
                        <input type="text"
                                id="username"
                                class="cardText"
                                placeholder="username"
                                value={this.state.players.admin}
                                onChange={event => this.setState({ admin: { username: event.target.value } })}>
                            </input>
                        <div class="cardSettings">advanced settings</div>
                        <div class="cardButtonsContainer">
                            <div class="cancelButton" onClick={this.props.onHostClose}>
                                Cancel
                            </div>
                            <div class="confirmButton" id="createRoom" onClick={this.interface}>
                                Host
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    interface(event) {
        const id = event.target.id;
        if (id == "createRoom") {
            this.createRoom();
        }

    }

    adminData() {
        return {
            username: this.state.admin.username,
            role: "null",
            admin: true,
        }
    }

    createRoom() {
        const db = this.state.db;
        const data = this.adminData();
        // the room number is a 5 digit alphanumeric code all uppercase
        const roomNumber = Math.random().toString(36).substr(2, 5).toUpperCase();
        set(ref(db, 'rooms/' + roomNumber + '/players/' + data.username), data);
        this.setState({ roomNumber });
        this.isInRoom = true;
        this.isAdmin = true;

        // remove the room after 5 minutes
        if (!this.state.gameInProgress) {
            const deleteTimeout = setTimeout(() => {
                this.deleteRoom();
            }, 900000);
            this.setState({ deleteTimeout });
        }
        onDisconnect(ref(db, 'rooms/' + roomNumber + '/players/' + data.username)).remove();
    }

}