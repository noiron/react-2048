import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SpeakerOn from '../../assets/svg/speaker-on.svg';
import SpeakerOff from '../../assets/svg/speaker-off.svg';
import styles from '../Button/button.css';

export default class Speaker extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            speaker: props.speakerOn || true
        };
    }

    handleClick = () => {
        this.setState({
            speaker: !this.state.speaker
        });
        this.props.onClick();
    };

    render() {
        const { speaker } = this.state;
        return (
            <div onClick={this.handleClick} className={styles.button}>
                <img src={speaker ? SpeakerOn : SpeakerOff} alt="speaker" />
            </div>
        )
    }
}
