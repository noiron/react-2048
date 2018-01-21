import React from 'react';
import PropTypes from 'prop-types';


export default class Cell extends React.Component {
    static propTypes = {
        value: PropTypes.number.isRequired
    };

    render() {
        const { value } = this.props;

        return (
            <td>
                <div>{value || null}</div>
            </td>
        )
    }
}