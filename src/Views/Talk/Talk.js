// @flow
import React, {Component} from 'react';
import {Avatar, Paper, IconButton} from 'material-ui';
import config from '../../Config/theme';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Comments from './Comments';
import {PropTypes} from 'prop-types';

export default class Talk extends Component {

    static propTypes = {
        profile: PropTypes.object.isRequired,
        match: PropTypes.object
    };

    render() {
        const { match, votes, schedule, profile, handleVote } = this.props;
        const talkId = match.params.id;

        const talkVotes = votes[talkId] || {};
        const item = schedule.findById(talkId);
        const avatar = item.speaker.photo ? <Avatar size={140} src={item.speaker.photo}/> : null;
        const userVote = talkVotes[profile.displayName];

        return (
            <div>
                <Paper style={{padding: 30, margin: 30, textAlign: 'center'}} zDepth={1}>
                    {avatar}
                    <h2 style={{color: config.palette.accent1Color}}>{item.speaker.name}</h2>
                    <h3>{item.title}</h3>
                    <VotingStars initialRating={userVote} handleVote={score => handleVote(talkId, score)} />
                </Paper>
                <h2>Komentarze</h2>
                <Comments id={item.id}/>
            </div>
        );
    }
}

/**
 * @param {Object} initialRating
 * @param {Function} handleVote
 */
const VotingStars = ({ initialRating, handleVote }) => {
    const currentScore = initialRating && initialRating.hasOwnProperty('score') ? initialRating.score : -2;
    return <div>
        <Star starScore={-1} currentScore={currentScore} onClick={handleVote}/>
        <Star starScore={0} currentScore={currentScore} onClick={handleVote}/>
        <Star starScore={1} currentScore={currentScore} onClick={handleVote}/>
        <Star starScore={2} currentScore={currentScore} onClick={handleVote}/>
        <Star starScore={3} currentScore={currentScore} onClick={handleVote}/>
    </div>
};

/**
 * @param {Number} currentScore
 * @param {Number} starScore
 * @param {Function} onClick
 */
const Star = ({ currentScore, starScore, onClick }) => {
    const starIcon = starScore <= currentScore ? <ActionGrade/> : <ToggleStarBorder/>;
    return <IconButton onTouchTap={() => onClick(starScore)} touch={true}>{starIcon}</IconButton>;
};
