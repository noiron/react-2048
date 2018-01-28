import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell';
import styles from '../Board/board.css';

export default class Row extends React.Component {
    static propTypes = {
        row: PropTypes.arrayOf(PropTypes.number).isRequired
    };

    render() {
        const { row } = this.props;

        return (
            <div className={styles.boardRow}>
                { row.map((num, index) => <Cell value={num} key={index} />)}
            </div>
        )
    }
}
