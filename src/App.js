import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import WebApp from './containers/WebApp';


export default class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isMobile: window.innerWidth <= 768
        };
    }

    componentWillMount() {

    }

    render() {
        // const { isMobile } = this.state;

        return (
            <WebApp />
        )
    }
}

export function setLocalStorageState(state) {
    // const { matrix, score, highScore, gameOver } = game;

    // const state = { matrix, score, highScore, gameOver };
    const stateStr = JSON.stringify(state);
    localStorage.setItem('2048_game_state', stateStr);
}