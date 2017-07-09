// @flow
import React, {Component} from 'react';
import {AppBar, Avatar} from "material-ui";

export default class AuthenticatedBar extends Component {
    render() {
        return (
            <AppBar title={this.props.title}
                    onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}
                    style={{position: 'sticky', top: 0}}
                    onRightIconButtonTouchTap={() => this.props.goTo('profile')}
                    iconElementRight={<Avatar style={{cursor: 'pointer'}} size={48} src={this.props.profile.photoURL}/>}>
                {this.props.children}
            </AppBar>
        )
    }
}