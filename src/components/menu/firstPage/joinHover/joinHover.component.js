import React from "react";
import "../card.style.css";

export class JoinHover extends React.Component {
    render() {
        return (
            <>
                <div class="container">
                    <div class="cardCard">
                        <div class="cardTitle">Join a game</div>
                        <input type="cardText" placeholder="Username" maxLength={12}></input>
                        <input type="cardText" placeholder="Room ID" maxLength={5}></input>
                        <div class="cardButtonsContainer">
                            <div class="cancelButton" onClick={this.props.onJoinClose}>
                                Cancel
                            </div>
                            <div class="confirmButton">
                                Host
                            </div>
                        </div>
                    </div>a
                </div>
            </>
        )
    }
}