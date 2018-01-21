import React from 'react';
import PropTypes from 'prop-types';
import Row from '../Row';
import './board.css';

export default class Board extends React.Component {
    static propTypes = {
        matrix: PropTypes.arrayOf(PropTypes.array).isRequired
    };

    render() {
        const { matrix } = this.props;

        return (
            <table>
                <tbody>
                    {matrix.map((row, index) => <Row row={row} key={index} />)}
                </tbody>
            </table>
        );
    }
}
