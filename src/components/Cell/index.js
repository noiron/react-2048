import React from 'react';
import PropTypes from 'prop-types';
import styles from './cell.css';


export default class Cell extends React.PureComponent {
    static propTypes = {
        value: PropTypes.number.isRequired
    };

    render() {
        const { value } = this.props;

        return (
            <div className={[styles.cell, styles[`color-${value}`]].join(' ')}>
                <div className={styles.inner}>{value || null}</div>
            </div>
        )
    }
}