import React, { Component } from 'react';
import Board from './components/Board';
import Matrix from './matrix';
import MoveAudio from './assets/audio/move.mp3';
import './App.css';

const moveAudio = new Audio(MoveAudio);

const matrix = new Matrix({
    matrix: [
        [0, 0, 2, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 4, 0, 0]
    ]
    // matrix: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            matrix
        };

        document.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        const { matrix } = this.state;

        switch (e.key) {
            case 'ArrowLeft':
                matrix.moveLeft();
                this.setState({ matrix });
                moveAudio.play();
                break;

            case 'ArrowRight':
                matrix.moveRight();
                this.setState({ matrix });
                moveAudio.play();
                break;

            case 'ArrowUp':
                matrix.moveUp();
                this.setState({ matrix });
                moveAudio.play();
                break;

            case 'ArrowDown':
                matrix.moveDown();
                this.setState({ matrix });
                moveAudio.play();
                break;

            // case 'r':
            //     matrix.rotateRight();
            //     this.setState({ matrix });
            //     break;

            // case 'l':
            //     matrix.rotateLeft();
            //     this.setState({ matrix });
            //     break;

            default:
                break;
        }
    };

    render() {
        return (
            <div className="App">
                <div className="score">Score: {this.state.matrix.score}</div>
                <Board matrix={this.state.matrix.matrix} />
            </div>
        );
    }
}

export default App;
