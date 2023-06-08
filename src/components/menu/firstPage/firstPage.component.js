import React from "react";
import "./firstPage.style.css";
import { HostHover } from "./hostHover/hostHover.component";
import { JoinHover } from "./joinHover/joinHover.component";
import { Link } from "react-router-dom";

export class FirstPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hostHover: false,
            joinHover: false,
        }
        this.openHost = this.openHost.bind(this);
        this.closeHostHover = this.closeHostHover.bind(this);
        this.openJoin = this.openJoin.bind(this);
        this.closeJoinHover = this.closeJoinHover.bind(this);
    }

    openHost() {
        this.setState({
            hostHover: true,
        })
    }

    closeHostHover() {
        this.setState({
            hostHover: false,
        })
    }

    openJoin() {
        this.setState({
            joinHover: true,
        })
        console.log("clicked")
    }

    closeJoinHover() {
        this.setState({
            joinHover: false,
        })
    }

    render() {
        return (
            <>
                {/* if join or host is pressed the component will show */}
                {this.state.hostHover == true ? <HostHover onHostClose={this.closeHostHover} /> : null}
                {this.state.joinHover == true ? <JoinHover onJoinClose={this.closeJoinHover} /> : null}
                <div class="pageContainer">
                    <div class="navbar">
                        <h1 class="title">Spyfall Reloaded</h1>
                        <div class="hamburger">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                    <div class="buttonContainer">
                        <div class="buttonItem" onClick={this.openHost}>
                            <p class="buttonItemText">Host</p>
                        </div>
                        <div class="buttonItem" onClick={this.openJoin}>
                            <p class="buttonItemText">Join</p>
                        </div>
                        <Link to="/howToPlay" class="buttonItem" onClick={this.howToPlay}>
                            <p class="buttonItemText">How to play</p>
                        </Link>
                    </div>
                    <div class="creditsContainer">
                        <p>A revisitation of the original <a href="https://spyfall.app" >Spyfall</a> game by <a href="">Alexandr Ushan</a></p>
                        <p>Developed by <a href="https://github.com/xJaiki">Mario Di Marino</a></p>
                        <p>Art by <a href="https://instagram.com/sakiispace">Sakiispace</a></p>
                    </div>
                </div>
            </>
        )
    }
}
