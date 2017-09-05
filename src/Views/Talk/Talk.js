import React from 'react';
import { Avatar, Paper } from 'material-ui';
import { PropTypes } from 'prop-types';

import Comments from './Comments';
import VotingStars from './VotingStars';

import moment from "moment";
import './Talk.css';

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
    const { speakers } = talk;
    const avatars = <div>
        {speakers.map(speaker => <Avatar key={speaker.name} className="speaker-avatar" size={140} src={speaker.photo}/>)}
    </div>;

    const talkVotes = votes[talkId] || {};
    const { score: userVoteValue } = talkVotes[profile.displayName] || {};

    this.isVotingStarted = () => {
        return moment(talk.date + ' ' + talk.start, "YYYY-MM-DD HH:mm").isBefore();
    };

    return <div>
        <Paper className="talk" style={{padding: 30, margin: 30, textAlign: 'center'}} zDepth={1}>
            {avatars}
            <h2 style={{color: '#D50E50'}}>
                {speakers.map(speaker => <div key={speaker.name}>{speaker.name}</div>)}
            </h2>
            <h3>{talk.title}</h3>

            <h4>Twoja ocena:</h4>
            <VotingStars enabled={this.isVotingStarted()} currentScore={userVoteValue} onScoreChange={newScore => handleVote(talkId, newScore)} />
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