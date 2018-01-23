import React, { Component } from 'react';
import Board from './components/Board';
import Matrix from './matrix';
import Speaker from './components/Speaker';
import MoveAudio from './assets/audio/move.mp3';
import './App.css';

const moveAudio = new Audio(MoveAudio);

const matrix = new Matrix({
    matrix: [
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

    handleKeyDown = e => {
        const { matrix, speakerOn } = this.state;

        switch (e.key) {
            case 'ArrowLeft':
                matrix.moveLeft();
                this.setState({ matrix });
                speakerOn && moveAudio.play();
                break;

            case 'ArrowRight':
                matrix.moveRight();
                this.setState({ matrix });
                speakerOn && moveAudio.play();
                break;

            case 'ArrowUp':
                matrix.moveUp();
                this.setState({ matrix });
                speakerOn && moveAudio.play();
                break;

            case 'ArrowDown':
                matrix.moveDown();
                this.setState({ matrix });
                speakerOn && moveAudio.play();
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
                <Board matrix={matrix.matrix} />
            </div>
        );
    }
}

export default App;
