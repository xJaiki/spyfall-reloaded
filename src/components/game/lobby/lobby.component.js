import React from "react";
import StartFirebase from '../../../utils/firebaseConfig/index';
import { ref, set, get, update, remove, child, onDisconnect } from 'firebase/database';
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import './lobby.style.css';

export class Lobby extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            db: null,
            username: '',
            players: [],
            roomNumber: '',
        }
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
        const { from } = this.props.location.state;
        return (
            <>
                <div class="playerList">
                    {/* write the state passed from the LINK */}
                    <h1>
                        {from}
                    </h1>
                </div>
            </>
         )
    }

    fetchPlayerList() {
        const db = this.state.db;
        const roomNumber = this.state.roomNumber;
        const players = [];
        get(child(ref(db), 'rooms/' + roomNumber + '/players')).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    players.push(childSnapshot.val());
                });
                this.setState({ players });
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    renderPlayerList() {
    }

}