// @flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire';

class Speakers extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            speakers: []
        }
    }

    componentDidMount() {
        this.bindAsArray(this.props.auth.firebase.database().ref('/speakers'), 'speakers');
    }

    render() {
        return (
            <ul>
                {this.state.speakers.map(it => <li key={it.email}>{it.email}</li>)}
            </ul>
        );
    }
}

reactMixin(Speakers.prototype, ReactFireMixin);

export default Speakers;
