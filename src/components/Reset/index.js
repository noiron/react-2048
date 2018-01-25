import React from 'react';
import PropTypes from 'prop-types';
import ResetSvg from '../../assets/svg/reset.svg';
import './reset.css';

const Reset = props => {

    const handleClick = () => {
        props.onClick();
    };

    return (
        <div onClick={handleClick} className="reset-btn">
            <img src={ResetSvg} alt="reset" />
        </div>
    )
}

Reset.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default Reset;
