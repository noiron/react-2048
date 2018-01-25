import React, { Component } from 'react';
import Board from './components/Board';
import Matrix from './matrix';
import Speaker from './components/Speaker';
import Reset from './components/Reset';
import MoveAudio from './assets/audio/move.mp3';
import './App.css';

const moveAudio = new Audio(MoveAudio);

const matrix = new Matrix({
    grids: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
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
            if (localStorageState.grids) {
                const { grids, score, isMoved } = localStorageState;
                const matrix = new Matrix({ grids, score, isMoved });
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

    resetGame = () => {
        this.setState(prevState => ({
            matrix: prevState.matrix._reset()
        }));
    }

    render() {
        const { matrix, speakerOn } = this.state;

        return (
            <div className="App">
                <div className="score">Score: {matrix.score}</div>
                <Speaker onClick={this.toggleSpeaker} speakerOn={speakerOn} />
                <Reset onClick={this.resetGame} />
                <Board matrix={matrix.grids} />
            </div>
        );
    }
}

export default App;

function setLocalStorageState(matrix) {
    const { grids, isMoved, score } = matrix;

    const state = {
        grids,
        isMoved,
        score
    };
    const stateStr = JSON.stringify(state);
    localStorage.setItem('2048_game_state', stateStr);
}
