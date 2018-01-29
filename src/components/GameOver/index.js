import React from 'react';
import styles from './gameOver.css';

const GameOver = (props) => {
    let className = styles.gameOver;
    if (props.className) {
        className = className + ' ' + props.className;
    }
    return (
        <div className={className}>Game Over</div>        
    )
}

export default GameOver;
