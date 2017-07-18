import React from 'react';
import { Avatar, Paper } from 'material-ui';
import { PropTypes } from 'prop-types';

import config from '../../Config/theme';

import Comments from './Comments';
import VotingStars from './VotingStars';

/**
 *
 * @param {Object} match
 * @param {Object} votes
 * @param {ScheduleRepository} schedule
 * @param {Profile} profile
 * @param {Function} handleVote
 */
const Talk = ({ match, votes, schedule, profile, handleVote }) => {
    const talkId = match.params.id;

    const talk = schedule.findById(talkId);
    const { speaker } = talk;
    const avatar = speaker.photo ? <Avatar size={140} src={speaker.photo}/> : null;

    const talkVotes = votes[talkId] || {};
    const { score: userVoteValue } = talkVotes[profile.displayName] || {};

    return <div>
        <Paper style={{padding: 30, margin: 30, textAlign: 'center'}} zDepth={1}>
            {avatar}
            <h2 style={{color: config.palette.accent1Color}}>{speaker.name}</h2>
            <h3>{talk.title}</h3>

            <h4>Twoja ocena:</h4>
            <VotingStars currentScore={userVoteValue} onScoreChange={newScore => handleVote(talkId, newScore)} />
        </Paper>
        <h2>Komentarze</h2>
        <Comments id={talk.id}/>
    </div>;
};

Talk.propTypes = {
    profile: PropTypes.object.isRequired,
    match: PropTypes.object
};

export default Talk;