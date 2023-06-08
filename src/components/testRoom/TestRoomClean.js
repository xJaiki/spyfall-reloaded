
import React from 'react';
import StartFirebase from '../../utils/firebaseConfig/index';
import { ref, set, get, update, remove, child, onDisconnect } from 'firebase/database';
import { useState } from 'react';
import style from './style.css';

export class TestRoomClean extends React.Component {
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

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.players !== this.state.players) || (prevState.roomNumber !== this.state.roomNumber)) {
            this.fetchPlayerList();
        }
    }


    render() {
        return (
            <>
                <h1>Spyfall Reloaded</h1>
                <div class="bodyContainer">
                    <div class="roomContainer">
                        <div class="hostingContainer">
                            <input type="text"
                                id="username"
                                class="input"
                                placeholder="username"
                                value={this.state.players.admin}
                                onChange={event => this.setState({ admin: { username: event.target.value } })}>
                            </input>
                            <button class="button" id="createRoom" onClick={this.interface}>Create room</button>
                        </div>
                        <div class="joinContainer">
                            <input type="text"
                                id="username"
                                class="input"
                                placeholder="username"
                                value={this.state.username}
                                onChange={event => this.setState({ username: event.target.value })}
                            >
                            </input>
                            <input type="text"
                                id="roomNumber"
                                class="input"
                                placeholder="room number"
                                value={this.state.roomNumber}
                                onChange={event => this.setState({ roomNumber: event.target.value })}>
                            </input>
                            <button class="button" id="joinBtn" onClick={this.interface}>Join room</button>
                        </div>
                    </div>
                    <div class="breakLine"></div>
                    <div class="roomInfo">
                        <p class="roomNumber">Room number: {this.state.roomNumber}</p>
                        <div id="playerList" class="playersList">
                            {this.renderPlayerList()}
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
        } else if (id == "joinBtn") {
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
        // the room number is a 4 digit number
        const roomNumber = Math.floor(Math.random() * 9000) + 1000;
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
    }

    deleteRoom() {
        const { db, roomNumber } = this.state;
        remove(ref(db, 'rooms/' + roomNumber));
    }

    fetchPlayerList() {
        const { db, roomNumber } = this.state;
        const playersRef = ref(db, `rooms/${roomNumber}/players`);

        get(playersRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const playersData = snapshot.val();
                    const players = Object.keys(playersData).map((key) => playersData[key]);
                    this.setState({ players });
                } else {
                    this.setState({ players: [] });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    renderPlayerList() {
        const { players } = this.state;
        if (this.isInRoom == true) {
            return players.map((player) => {
                return (
                    <div class="playerContainer">
                        <div class="player">
                            <p>{player.username}</p>
                            <p>{player.role}</p>
                        </div>
                    </div>
                );
            });
        }
    }
}