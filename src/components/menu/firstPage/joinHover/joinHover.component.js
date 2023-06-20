import React from "react";
import StartFirebase from '../../../../utils/firebaseConfig/index';
import { ref, set, get, update, remove, child, onDisconnect } from 'firebase/database';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../card.style.css";

export class JoinHover extends React.Component {
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
            isConfirmed: false,
            joinCountdown: 3,
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
                        <div class="cardTitle">Join a game</div>
                        <input type="text"
                            id="username"
                            class="cardText"
                            placeholder="username"
                            value={this.state.username}
                            onChange={event => this.setState({ username: event.target.value })}
                        >
                        </input>
                        <input type="text"
                            id="roomNumber"
                            class="car"
                            placeholder="room number"
                            value={this.state.roomNumber}
                            onChange={event => this.setState({ roomNumber: event.target.value })}>
                        </input>
                        <div class="cardButtonsContainer">
                        <div class="cancelButton" onClick={this.props.onJoinClose}>
                                Cancel
                            </div>
                            {this.state.isConfirmed == true ?
                                <div class="confirmButton" id="joinRoom">
                                    {this.state.joinCountdown}
                                </div> :
                                <div class="confirmButton" id="joinRoom" onClick={this.interface} >
                                    Join
                                </div>}

                            <Link to={'/lobby'} state={{ prova: this.state.roomNumber }} style={{ display: "none" }} id="createRoomPivot" onClick={this.interface}>
                                Host
                            </Link>
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
        } else if (id == "joinRoom") {
            this.joinRoom();
        }

    }

    playerData() {
        return {
            username: this.state.username,
            role: "null",
            admin: false,
        }
    }

    joinRoom() {
        const db = this.state.db;
        const data = this.playerData();
        const roomNumber = this.state.roomNumber;
        set(ref(db, 'rooms/' + roomNumber + '/players/' + data.username), data);
        this.isInRoom = true;


        if (this.state.gameInProgress && this.state.deleteTimeout) {
            clearTimeout(this.state.deleteTimeout);
            this.setState({ deleteTimeout: null });
        }
        onDisconnect(ref(db, 'rooms/' + roomNumber + '/players/' + data.username)).remove();

        this.setState({ isConfirmed: true });
        this.countdown();
        setTimeout(() => {
            this.handleRedirect();
        }, 3000);

    }

    handleRedirect() {
        const createRoomPivot = document.getElementById("createRoomPivot");
        createRoomPivot.click();
    }

    countdown() {
        const countdown = setInterval(() => {
            this.setState({ joinCountdown: this.state.joinCountdown - 1 });
        }, 1000);
        setTimeout(() => {
            clearInterval(countdown);
        }, 3000);
    }

    deleteRoom() {
        const { db, roomNumber } = this.state;
        remove(ref(db, 'rooms/' + roomNumber));
    }

}