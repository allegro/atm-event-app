import React from 'react';
import { IconButton } from 'material-ui';
import { PropTypes } from 'prop-types';
import { ToggleStar, ToggleStarBorder } from 'material-ui/svg-icons'

import config from '../../Config/theme';

/**
 * @param {Number} props.currentScore
 * @param {Function} props.onScoreChange
 */
const VotingStars = (props) => {
    const choices = [
        { value: -1, text: 'Do bani!' },
        { value:  0, text: 'Taka sobie...' },
        { value:  1, text: 'Dobra!' },
        { value:  2, text: 'Świetna!' },
        { value:  3, text: 'Wyśmienita!' },
    ].map(option => <Star key={option.value} {...option} {...props} />);

    return <div>{choices}</div>;
};

VotingStars.defaultProps = {
    currentScore: -Infinity
};

VotingStars.propTypes = {
    currentScore: PropTypes.number.isRequired,
    onScoreChange: PropTypes.func.isRequired
};

/**
 * @param {Number} currentScore
 * @param {Number} value
 * @param {String} text
 * @param {Function} onScoreChange
 * @param {Node} iconFilled
 * @param {Node} iconNormal
 */
const Star = ({ currentScore, value, text, onScoreChange, iconFilled, iconNormal }) => {
    const isFilled = value <= currentScore;
    const starIcon = isFilled ? iconFilled : iconNormal;

    return <IconButton style={{width: 35}} onTouchTap={() => onScoreChange(value)} touch={true} tooltip={text}>{starIcon}</IconButton>;
};

Star.defaultProps = {
    iconFilled: <ToggleStar color={config.palette.ratingStarsColor} />,
    iconNormal: <ToggleStarBorder color={config.palette.borderColor} />
};

Star.propTypes = {
    currentScore: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onScoreChange: PropTypes.func.isRequired,
    iconFilled: PropTypes.node,
    iconNormal: PropTypes.node
};

export default VotingStars;