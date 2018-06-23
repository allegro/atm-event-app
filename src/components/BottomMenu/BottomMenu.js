import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PlaceIcon from "@material-ui/icons/Place";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import TodayIcon from "@material-ui/icons/Today";
import HomeIcon from "@material-ui/icons/Home";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main
    },
    linkRoot: {
        color: fade(theme.palette.primary.contrastText, .6),
        "&$linkSelected": {
            color: theme.palette.primary.contrastText,
        }
    },
    linkSelected: {}
});

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

        const inverted = {
            root: classes.linkRoot,
            selected: classes.linkSelected
        };

        return (
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                classes={{ root: classes.root }}
            >
                <BottomNavigationAction label="Główna" icon={<HomeIcon />} classes={inverted} />
                <BottomNavigationAction label="Agenda" icon={<TodayIcon />} classes={inverted} />
                <BottomNavigationAction label="Oceny" icon={<StarBorderIcon />} classes={inverted} />
                <BottomNavigationAction label="Dojazd" icon={<CardTravelIcon />} classes={inverted} />
                <BottomNavigationAction label="Mapa" icon={<PlaceIcon />} classes={inverted} />
            </BottomNavigation>
        );
    }
}

BottomMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomMenu);
