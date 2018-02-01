import React from 'react';
import PropTypes from 'prop-types';
import UndoSvg from '../../assets/svg/undo.svg';
import Button from '../Button';

const Undo = props => {
    return (
        <Button img={UndoSvg} desc="undo" {...props} />
    )
}

Undo.propTypes = {
    handleClick: PropTypes.func.isRequired
}

export default Undo;
