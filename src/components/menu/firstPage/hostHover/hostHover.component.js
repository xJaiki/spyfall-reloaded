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
            gameInProgress: false,
        }
        this.interface = this.interface.bind(this);
    }

    componentDidMount() {
        this.setState({
            db: StartFirebase(),
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.players !== this.state.players) || (prevState.roomNumber !== this.state.roomNumber)) {
            this.fetchPlayerList();
        }
    }

    playerData(){
        return {
            username: this.state.username,
            role: 'role',
        }
    }

    interface() {
        if (this.state.isInRoom) {
            this.leaveRoom();
        } else {
            this.createRoom();
        }
    }

    createRoom() {
        const roomNumber = Math.floor(Math.random() * 1000000);
        const playerData = this.playerData();
        const roomData = {
            players: [playerData],
            gameInProgress: false,
        }
        const roomRef = ref(this.state.db, 'rooms/' + roomNumber);
        set(roomRef, roomData);
        this.setState({
            roomNumber: roomNumber,
            isInRoom: true,
        })
    }

    render() {
        return (
            <>
                <div class="container">
                    <div class="cardCard">
                        <div class="cardTitle">Host a game</div>
                        <input type="cardText" placeholder="Username" maxLength={12}></input>
                        <div class="cardSettings">advanced settings</div>
                        <div class="cardButtonsContainer">
                            <div class="cancelButton" onClick={this.props.onHostClose}>
                                Cancel
                            </div>
                            <div class="confirmButton" onClick={this.createRoom}>
                                Host
                            </div>
                        </div>
                    </div>a
                </div>
            </>
        )
    }
}