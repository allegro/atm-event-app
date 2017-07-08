// @flow
import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem, Paper} from "material-ui";
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

export default class BottomMenu extends Component {

    goTo = (route: string) => {
        this.props.history.push(`/atm/${route}`);
    };

    render() {
        return (
            <Paper zDepth={1} style={{position: 'sticky', bottom: 0, zIndex: 1000}}>
                <BottomNavigation>
                    <BottomNavigationItem label="Główna" icon={<ActionHome/>} onTouchTap={() => this.goTo('home')}/>
                    <BottomNavigationItem label="Rozkład" icon={<ActionSchedule/>} onTouchTap={() => this.goTo('schedule')}/>
                    <BottomNavigationItem label="Mapa" icon={<IconLocationOn/>} onTouchTap={() => this.goTo('info')}/>
                </BottomNavigation>
            </Paper>
        );
    }
}