import React from 'react';
import PropTypes from 'prop-types';
import ResetSvg from '../../assets/svg/reset.svg';
import Button from '../Button';

const Reset = props => {
    return (
        <Button img={ResetSvg} desc="reset" {...props} />
    )
}

Reset.propTypes = {
    handleClick: PropTypes.func.isRequired
}

export default Reset;
