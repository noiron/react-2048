import React from 'react';
import PropTypes from 'prop-types';
import styles from './cell.css';


export default class Cell extends React.Component {
    static propTypes = {
        value: PropTypes.number.isRequired
    };

    render() {
        const { value } = this.props;

        // const gray = Math.max(255 - Math.floor(value * 2048 / 255), 100);
        // const style = `rgba(${gray}, ${gray}, ${gray}, 0.6)`;

        return (
            <div className={[styles.cell, styles[`color-${value}`]].join(' ')}>
                <div className={styles.inner}>{value || null}</div>
            </div>
        )
    }
}