import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../Cell';

export default class Row extends React.Component {
    static propTypes = {
        row: PropTypes.arrayOf(PropTypes.number).isRequired
    };

    render() {
        const { row } = this.props;

        return (
            <tr>
                { row.map((num, index) => <Cell value={num} key={index} />)}
            </tr>
        )
    }
}
