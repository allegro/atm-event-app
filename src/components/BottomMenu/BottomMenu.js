import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PlaceIcon from '@material-ui/icons/Place';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import TodayIcon from '@material-ui/icons/Today';
import HomeIcon from '@material-ui/icons/Home';

const styles = {
    root: {
        position: 'fixed',
        bottom: 0,
        width: '100%'
    },
};

class BottomMenu extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Główna" icon={<HomeIcon />} />
                <BottomNavigationAction label="Agenda" icon={<TodayIcon />} />
                <BottomNavigationAction label="Oceny" icon={<StarBorderIcon />} />
                <BottomNavigationAction label="Dojazd" icon={<CardTravelIcon />} />
                <BottomNavigationAction label="Mapa" icon={<PlaceIcon />} />
            </BottomNavigation>
        );
    }
}

BottomMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomMenu);
