import React, { Component } from 'react';
import Board from './components/Board';
import Matrix from './matrix';
import Speaker from './components/Speaker';
import MoveAudio from './assets/audio/move.mp3';
import './App.css';

const moveAudio = new Audio(MoveAudio);

const matrix = new Matrix({
    mat: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    // matrix: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            matrix,
            speakerOn: true,
        };

        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentDidMount() {
        // 如果 localStorage 中保存有数据，则读取以用于初始化
        if (localStorage.getItem('2048_game_state')) {
            const localStorageState = JSON.parse(localStorage.getItem('2048_game_state'));
            if (localStorageState.mat) {
                const { mat, score, isMoved } = localStorageState;
                const matrix = new Matrix({ mat, score, isMoved });
                this.setState({ matrix });
        }
    }
}

    handleKeyDown = e => {
        const { matrix } = this.state;

        switch (e.key) {
            case 'ArrowLeft':
                matrix.moveLeft();
                this._operationAfterMove(matrix);
                break;

            case 'ArrowRight':
                matrix.moveRight();
                this._operationAfterMove(matrix);
                break;

            case 'ArrowUp':
                matrix.moveUp();
                this._operationAfterMove(matrix);
                break;

            case 'ArrowDown':
                matrix.moveDown();
                this._operationAfterMove(matrix);
                break;

            default:
                break;
        }
    };

    _operationAfterMove(matrix) {
        const { speakerOn } = this.state;
        this.setState({ matrix });
        speakerOn && moveAudio.play();
        // 每次操作后将数据保存到 localStorage 中去
        setLocalStorageState(matrix);
    }

    toggleSpeaker = () => {
        this.setState({
            speakerOn: !this.state.speakerOn
        });
    };

    render() {
        const { matrix, speakerOn } = this.state;

        return (
            <div className="App">
                <div className="score">Score: {matrix.score}</div>
                <Speaker onClick={this.toggleSpeaker} speakerOn={speakerOn} />
                <Board matrix={matrix.mat} />
            </div>
        );
    }
}

export default App;

function setLocalStorageState(matrix) {
    const { mat, isMoved, score } = matrix;

    const state = {
        mat,
        isMoved,
        score
    };
    const stateStr = JSON.stringify(state);
    localStorage.setItem('2048_game_state', stateStr);
}
