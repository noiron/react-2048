import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './components/Board';
import Game from './game';
import Speaker from './components/Speaker';
import Reset from './components/Reset';
import MoveAudio from './assets/audio/move.mp3';
import * as actions from './actions/index';

import styles from './index.css';

const moveAudio = new Audio(MoveAudio);

const game = new Game({
    matrix: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
});

const mapStateToProps = state => {
    return {
        matrix: state.matrix,
        score: state.score,
        highScore: state.highScore,
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
        // 如果 localStorage 中保存有数据，则读取以用于初始化
        if (localStorage.getItem('2048_game_state')) {
            const localStorageState = JSON.parse(localStorage.getItem('2048_game_state'));
            if (localStorageState.matrix) {
                const { matrix, score, highScore } = localStorageState;

                this.props.dispatch({
                    type: 'INIT',
                    payload: {
                        matrix,
                        score,
                        highScore
                    }
                })
                return;
            }
        } else {
            this.props.dispatch({
                type: 'INIT'
            })
        }
    }

    handleKeyDown = e => {
        const { game } = this.state;
        const { dispatch } = this.props;

        switch (e.key) {
            case 'ArrowLeft':
                // game.moveLeft();
                dispatch(actions.moveLeft());
                this._operationAfterMove(game);
                break;

            case 'ArrowRight':
                // game.moveRight();
                dispatch(actions.moveRight());
                this._operationAfterMove(game);
                break;

            case 'ArrowUp':
                // game.moveUp();
                dispatch(actions.moveUp());
                this._operationAfterMove(game);
                break;

            case 'ArrowDown':
                // game.moveDown();
                dispatch(actions.moveDown());
                this._operationAfterMove(game);
                break;

            default:
                break;
        }
    };

    _operationAfterMove(game) {
        const { speakerOn } = this.state;
        // this.setState({ game });
        speakerOn && moveAudio.play();
        // 每次操作后将数据保存到 localStorage 中去
        // setLocalStorageState(game);
    }

    toggleSpeaker = () => {
        this.setState({
            speakerOn: !this.state.speakerOn
        });
    };

    resetGame = () => {
        // this.setState(prevState => ({
        //     game: prevState.game._reset()
        // }));
        this.props.dispatch({
            type: 'RESET'
        })
    };

    render() {
        const { game, speakerOn } = this.state;

        console.log(this.props);

        return (
            <div className={styles.App}>
                <section className={styles.scoresRow}>
                    <div className={styles.score}>Score: {this.props.score}</div>
                    <div className={styles.score}>HighScore: {this.props.highScore}</div>
                </section>

                <div className={styles.buttonsRow}>
                    <Speaker onClick={this.toggleSpeaker} speakerOn={speakerOn} />
                    <Reset onClick={this.resetGame} />
                </div>                
                <Board matrix={this.props.matrix} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);

export function setLocalStorageState(game) {
    const { matrix, score, highScore } = game;

    const state = {
        matrix,
        score,
        highScore,
    };
    const stateStr = JSON.stringify(state);
    localStorage.setItem('2048_game_state', stateStr);
}
