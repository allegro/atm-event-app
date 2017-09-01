// @flow
import React, {Component} from 'react';
import {AppBar, IconButton} from 'material-ui';
import SocialPerson from 'material-ui/svg-icons/social/person';
import logo from './logo';

export default class AnonymousAppBar extends Component {
    render() {
        return (
            <AppBar title={this.props.title} iconElementRight={<IconButton><SocialPerson/></IconButton>}
                    iconElementLeft={logo}
                    style={{position: 'sticky', top: 0}}
                    onRightIconButtonTouchTap={this.handleLogin}>
                {this.props.children}
            </AppBar>
        )
    }
}
