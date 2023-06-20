import React from "react";
import StartFirebase from '../../../utils/firebaseConfig/index';
import { ref, set, get, update, remove, child, onDisconnect, off, onValue } from 'firebase/database';
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useEffect } from "react";
import './lobby.style.css';
import { render } from "@testing-library/react";


export const Lobby = () => {
    const location = useLocation();
    const { prova } = location.state;
    const [db, setDb] = useState(StartFirebase());

    const [players, setPlayers] = useState([]);
    useEffect(() => {
        const roomReference = "rooms/" + prova + "/players";
        const roomRef = ref(db, roomReference);

        const handleData = (snapshot) => {
            const playersData = snapshot.val();
            if (playersData) {
                const playersArray = Object.values(playersData);
                setPlayers(playersArray);
            } else {
                setPlayers([]);
            }
        };

        // Aggiungi un listener per l'evento "value"
        onValue(roomRef, handleData);

        // Cleanup: Rimuovi il listener quando il componente viene smontato
        return () => {
            off(roomRef, handleData);
        };
    }, [db]);

    return (
        <>
            {/* write the room ID */}
            <div class="roomIDContainer">
                <h1 class="roomID" style={{ color: "white" }}>Room ID: {prova}</h1>
            </div>
            <div class="lobbyContainer">
                <div class="lobbyPlayersContainer">
                    {players.map((player, index) => (
                        <div key={index} style={{ color: "white" }} className="playerItem">
                            {player.username}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}