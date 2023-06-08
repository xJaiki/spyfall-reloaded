import React from 'react';
import StartFirebase from '../../utils/firebaseConfig';
import { ref, set, get, update, remove, child } from 'firebase/database';

export class TestRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            db: null,
            admin: {
                username: "",
                role: "",
            },
            players: [
                
            ]
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
                <input type="text"
                    id="username"
                    placeholder="admin"
                    value={this.state.admin.username}
                    onChange={event => this.setState({ admin: { username: event.target.value } })}>
                </input>
                <br>
                </br>
                <button id="addBtn" onClick={this.interface}>Create room</button>
                <br>
                </br>

                <div id="roomInfo">
                    <p>Room number: {this.state.roomNumber}</p>
                    <p>Admin: {this.state.admin.username}</p>
                    <div id="players">
                        <p>Players:</p>
                        <div id="playerList">
                        </div>
                    </div>
                </div>

                <input type="text"
                    id="username"
                    placeholder="username"
                    value={this.state.players.username}
                    onChange={event => this.setState({ players: { username: event.target.value } })}>
                </input>
                <input type="text"
                    id="roomNumber"
                    placeholder="room number"
                    value={this.state.roomNumber}
                    onChange={event => this.setState({ roomNumber: event.target.value })}>
                </input>
                <button id="joinBtn" onClick={this.interface}>Join room</button>
            </>
        )
    }

    interface(event) {
        const id = event.target.id;

        if (id == "addBtn") {
            this.insertData();
        }
        else if (id == "joinBtn") {
            this.joinRoom();
        }
    }

    getAllInputs() {
        return {
            admin: {
                username: this.state.admin.username,
                role: "role",
            },
        }
    }



    insertData() {
        const db = this.state.db;
        const data = this.getAllInputs();
        const roomNumber = Math.floor(Math.random() * 1000000);
        set(ref(db, 'rooms/' + roomNumber), data);
        this.setState({
            roomNumber: roomNumber,
        })

        console.log("Data inserted");
    }

    joinRoom() {
        const db = this.state.db;
        const roomNumber = this.state.roomNumber;
        const username = this.state.players.username;
        const playerList = document.getElementById("playerList");
        const data = {
            username: username,
            role: "role",
        }
        const roomRef = ref(db, 'rooms/' + roomNumber);
        get(child(roomRef, 'players')).then((snapshot) => {
            if (snapshot.exists()) {
                const players = snapshot.val();
                players.push(data);
                update(ref(db, 'rooms/' + roomNumber), {
                    players: players,
                });
                playerList.innerHTML = "";
                players.forEach((player) => {
                    playerList.innerHTML += "<p>" + player.username + "</p>";
                }
                )
            }
            else {
                set(child(roomRef, 'players'), [data]);
            }
        }
        ).catch((error) => {
            console.error(error);
        }
        );
    }
}