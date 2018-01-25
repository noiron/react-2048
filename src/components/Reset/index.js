import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ResetSvg from '../../assets/svg/reset.svg';
import './reset.css';

export default class Reset extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };

    handleClick = () => {
        this.props.onClick();
    };

    render() {
        return (
            <div onClick={this.handleClick} className="reset-btn">
                <img src={ResetSvg} alt="reset" />
            </div>
        )
    }
}
