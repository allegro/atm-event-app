import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { compose } from "recompose";
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

const links = [
    { label: "Główna", link: "/", exact: true, icon: <HomeIcon /> },
    { label: "Agenda", link: "/schedule", icon: <TodayIcon /> },
    { label: "Oceny", link: "/votes", icon: <StarBorderIcon /> },
    { label: "Dojazd", link: "/directions", icon: <CardTravelIcon /> },
    { label: "Mapa", link: "/map", icon: <PlaceIcon /> },
];

class BottomMenu extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.props.navigateTo(links[value].link);
    };

    static getDerivedStateFromProps(props) {
        const { currentPath } = props;

        return {
            value: links.findIndex(link => link.exact
                ? currentPath === link.link
                : currentPath.startsWith(link.link)
            )
        };
    }

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
                {links.map(link => (
                    <BottomNavigationAction key={link.label} label={link.label} icon={link.icon} classes={inverted} />
                ))}
            </BottomNavigation>
        );
    }
}

BottomMenu.propTypes = {
    currentPath: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    navigateTo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    currentPath: state.router.location.pathname
});

const mapDispatchToProps = (dispatch) => ({
    navigateTo: (path) => dispatch(push(path))
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(BottomMenu);
