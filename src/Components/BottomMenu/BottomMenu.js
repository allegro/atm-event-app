// @flow
import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem, Paper} from "material-ui";
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import {PropTypes} from 'prop-types';

export default class BottomMenu extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    goTo = (route: string) => {
        this.props.history.replace(`/atm/${route}`);
    };

    render() {
        return (
            <Paper zDepth={1} style={{position: 'sticky', bottom: 0, zIndex: 1000}}>
                <BottomNavigation>
                    <BottomNavigationItem label="Główna" icon={<ActionHome/>} onTouchTap={() => this.goTo('')}/>
                    <BottomNavigationItem label="Rozkład" icon={<ActionSchedule/>} onTouchTap={() => this.goTo('schedule')}/>
                    <BottomNavigationItem label="Mapa" icon={<IconLocationOn/>} onTouchTap={() => this.goTo('info')}/>
                </BottomNavigation>
            </Paper>
        );
    }
}