import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.css';

const Button = (props) => {
    return (
        <div onClick={props.handleClick} className={styles.button}>
            <img src={props.img} alt={props.desc} />
        </div>
    )
}

Button.propTypes = {
    handleClick: PropTypes.func.isRequired,
    img: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
}

export default Button;
