import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './components/Board';
import Speaker from './components/Speaker';
import Reset from './components/Reset';
import GameOver from './components/GameOver';
import MoveAudio from './assets/audio/move.mp3';
import * as actions from './actions/index';

import styles from './index.css';

const moveAudio = new Audio(MoveAudio);

const mapStateToProps = state => {
    return {
        matrix: state.matrix,
        score: state.score,
        highScore: state.highScore,
        gameOver: state.gameOver,
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speakerOn: true,
        };

        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        // 如果 localStorage 中保存有数据，则读取以用于初始化
        if (localStorage.getItem('2048_game_state')) {
            const localStorageState = JSON.parse(localStorage.getItem('2048_game_state'));
            if (localStorageState.matrix) {
                const { matrix, score, highScore, gameOver } = localStorageState;

                dispatch(actions.init({ matrix, score, highScore, gameOver }));
                return;
            }
        } else {
            dispatch(actions.init());
        }
    }

    handleKeyDown = e => {
        const { game } = this.state;
        const { dispatch } = this.props;

        switch (e.key) {
            case 'ArrowLeft':
                dispatch(actions.moveLeft());
                this._operationAfterMove(game);
                break;

            case 'ArrowRight':
                dispatch(actions.moveRight());
                this._operationAfterMove(game);
                break;

            case 'ArrowUp':
                dispatch(actions.moveUp());
                this._operationAfterMove(game);
                break;

            case 'ArrowDown':
                dispatch(actions.moveDown());
                this._operationAfterMove(game);
                break;

            default:
                break;
        }
    };

    _operationAfterMove(game) {
        const { speakerOn } = this.state;
        speakerOn && moveAudio.play();
    }

    toggleSpeaker = () => {
        this.setState({
            speakerOn: !this.state.speakerOn
        });
    };

    resetGame = () => {
        this.props.dispatch(actions.reset());
    };

    render() {
        const { speakerOn } = this.state;
        const { matrix, score, highScore, gameOver } = this.props;

        return (
            <div className={styles.App}>
                <section className={styles.scoresRow}>
                    <div className={styles.score}>Score: {score}</div>
                    <div className={styles.score}>Best Score: {highScore}</div>
                </section>

                <div className={styles.buttonsRow}>
                    <Speaker onClick={this.toggleSpeaker} speakerOn={speakerOn} />
                    <Reset onClick={this.resetGame} />
                </div>                
                <Board matrix={matrix} />

                {gameOver && <GameOver className={styles.gameOver} />}
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);

export function setLocalStorageState(game) {
    const { matrix, score, highScore, gameOver } = game;

    const state = { matrix, score, highScore, gameOver };
    const stateStr = JSON.stringify(state);
    localStorage.setItem('2048_game_state', stateStr);
}
