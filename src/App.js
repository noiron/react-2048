import React, { Component } from 'react';
import Board from './components/Board';
import Game from './game';
import Speaker from './components/Speaker';
import Reset from './components/Reset';
import MoveAudio from './assets/audio/move.mp3';
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

class App extends Component {
    constructor() {
        super();
        this.state = {
            game,
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
                const game = new Game({ matrix, score, highScore });
                this.setState({ game });
        }
    }
}

    handleKeyDown = e => {
        const { game } = this.state;

        switch (e.key) {
            case 'ArrowLeft':
                game.moveLeft();
                this._operationAfterMove(game);
                break;

            case 'ArrowRight':
                game.moveRight();
                this._operationAfterMove(game);
                break;

            case 'ArrowUp':
                game.moveUp();
                this._operationAfterMove(game);
                break;

            case 'ArrowDown':
                game.moveDown();
                this._operationAfterMove(game);
                break;

            default:
                break;
        }
    };

    _operationAfterMove(game) {
        const { speakerOn } = this.state;
        this.setState({ game });
        speakerOn && moveAudio.play();
        // 每次操作后将数据保存到 localStorage 中去
        setLocalStorageState(game);
    }

    toggleSpeaker = () => {
        this.setState({
            speakerOn: !this.state.speakerOn
        });
    };

    resetGame = () => {
        this.setState(prevState => ({
            game: prevState.game._reset()
        }));
    };

    render() {
        const { game, speakerOn } = this.state;

        return (
            <div className={styles.App}>
                <section className={styles.scoresRow}>
                    <div className={styles.score}>Score: {game.score}</div>
                    <div className={styles.score}>HighScore: {game.highScore}</div>
                </section>

                <div className={styles.buttonsRow}>
                    <Speaker onClick={this.toggleSpeaker} speakerOn={speakerOn} />
                    <Reset onClick={this.resetGame} />
                </div>                
                <Board matrix={game.matrix} />
            </div>
        );
    }
}

export default App;

function setLocalStorageState(game) {
    const { matrix, score, highScore } = game;

    const state = {
        matrix,
        score,
        highScore,
    };
    const stateStr = JSON.stringify(state);
    localStorage.setItem('2048_game_state', stateStr);
}
