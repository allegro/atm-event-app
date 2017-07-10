// @flow
import React, {Component} from 'react';
import {Avatar, Paper, IconButton} from 'material-ui';
import ScheduleRepository from '../../Repositories/ScheduleRepository'
import config from '../../Config/theme';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';
import Comments from './Comments';
import {PropTypes} from 'prop-types';

class Talk extends Component {

    static propTypes = {
        getProfile: PropTypes.func.isRequired,
        firebase: PropTypes.object,
        match: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {votes: {}}
    }

    componentDidMount() {
        const firebaseRef = this.props.firebase.database().ref(`/votes/${this.props.match.params.id}`);
        this.setState({ref: firebaseRef});
        this.bindAsObject(firebaseRef, 'votes');
    }

    handleVote(score) {
        this.state.ref.child('/' + this.props.getProfile().displayName).update({score: score, time: new Date()});
    };

    getStars(initialRating) {
        if (!initialRating || !initialRating.hasOwnProperty('score')) {
            return <div>
                <EmptyStar onVote={() => this.handleVote(-1)}/>
                <EmptyStar onVote={() => this.handleVote(0)}/>
                <EmptyStar onVote={() => this.handleVote(1)}/>
                <EmptyStar onVote={() => this.handleVote(2)}/>
                <EmptyStar onVote={() => this.handleVote(3)}/>
            </div>
        }
        const score = initialRating.score;
        return <div>
            {score >= -1 ? <FullStar onVote={() => this.handleVote(-1)}/> : <EmptyStar onVote={() => this.handleVote(-1)}/>}
            {score >= 0 ? <FullStar onVote={() => this.handleVote(0)}/> : <EmptyStar onVote={() => this.handleVote(0)}/>}
            {score >= 1 ? <FullStar onVote={() => this.handleVote(1)}/> : <EmptyStar onVote={() => this.handleVote(1)}/>}
            {score >= 2 ? <FullStar onVote={() => this.handleVote(2)}/> : <EmptyStar onVote={() => this.handleVote(2)}/>}
            {score >= 3 ? <FullStar onVote={() => this.handleVote(3)}/> : <EmptyStar onVote={() => this.handleVote(3)}/>}
        </div>
    }

    render() {
        const item = ScheduleRepository.findById(this.props.match.params.id);
        const avatar = item.speaker.photo ? <Avatar size={140} src={item.speaker.photo}/> : null;
        const initialVote = this.state.votes[this.props.getProfile().displayName];
        return (
            <div>
                <Paper style={{padding: 30, margin: 30, textAlign: 'center'}} zDepth={1}>
                    {avatar}
                    <h2 style={{color: config.palette.accent1Color}}>{item.speaker.name}</h2>
                    <h3>{item.title}</h3>
                    {this.getStars(initialVote)}
                </Paper>
                <h2>Komentarze</h2>
                <Comments id={item.id}/>
            </div>
        )
    }
}

class FullStar extends Component {
    static propTypes = {
        rating: PropTypes.number.isRequired,
        onVote: PropTypes.func.isRequired
    };

    render() {
        return (
            <IconButton onTouchTap={() => this.props.onVote(this.props.rating)} touch={true}><ActionGrade/></IconButton>
        );
    }
}

class EmptyStar extends Component {
    static propTypes = {
        rating: PropTypes.number.isRequired,
        onVote: PropTypes.func.isRequired
    };

    render() {
        return (
            <IconButton onTouchTap={() => this.props.onVote(this.props.rating)} touch={true}><ToggleStarBorder/></IconButton>
        );
    }
}

reactMixin(Talk.prototype, ReactFireMixin);
export default Talk;