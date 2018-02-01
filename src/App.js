import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './components/Board';
import Speaker from './components/Speaker';
import Reset from './components/Reset';
import Button from './components/Button';
import GameOver from './components/GameOver';
import MoveAudio from './assets/audio/move.mp3';
import * as actions from './actions/index';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import UndoSvg from './assets/svg/undo.svg';

import styles from './App.css';

const moveAudio = new Audio(MoveAudio);

const mapStateToProps = state => {
    return {
        matrix: state.present.matrix,
        score: state.present.score,
        highScore: state.present.highScore,
        gameOver: state.present.gameOver,
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
            if (localStorageState.present.matrix) {
                const { matrix, score, highScore, gameOver } = localStorageState.present;

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
        const { dispatch } = this.props;
        dispatch(actions.reset());
        // reset 游戏后，将不能撤销到之前的状态
        dispatch(UndoActionCreators.clearHistory());  
    };

    undoGame = () => {
        this.props.dispatch(UndoActionCreators.undo());
    }

    render() {
        const { speakerOn } = this.state;
        const { matrix, score, highScore, gameOver } = this.props;

        return (
            <div className={styles.App}>
                <section className={styles.scoresRow}>
                    <div className={styles.score}>
                        <span className={styles.scoreLabel}>Score</span>
                        <span className={styles.scoreValue}>{score}</span>
                    </div>
                    <div className={styles.score}>
                        <span className={styles.scoreLabel}>Best</span>
                        <span className={styles.scoreValue}>{highScore}</span>
                    </div>
                </section>

                <div className={styles.buttonsRow}>
                    <Speaker onClick={this.toggleSpeaker} speakerOn={speakerOn} />
                    <Button handleClick={this.undoGame} img={UndoSvg} desc="undo">Undo</Button>
                    <Reset onClick={this.resetGame} />
                </div>                
                <Board matrix={matrix} />

                {gameOver && <GameOver className={styles.gameOver} />}

            </div>
        );
    }
}

export default connect(mapStateToProps)(App);

export function setLocalStorageState(state) {
    // const { matrix, score, highScore, gameOver } = game;

    // const state = { matrix, score, highScore, gameOver };
    const stateStr = JSON.stringify(state);
    localStorage.setItem('2048_game_state', stateStr);
}
