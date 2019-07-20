import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

import ScheduleItem from "../../components/Schedule/ScheduleItem";
import TalkVoteView from "../../components/Talk/TalkVote";
import Talk from "../../domain/Talk";

const styles = theme => ({
    sectionHeader: {
        fontWeight: 100,
        padding: theme.spacing(3)
    },
    tabsIndicator: {
        backgroundColor: theme.palette.secondary
    },
    tabsRoot: {
        backgroundColor: theme.palette.primary.main
    },
    tabRoot: {
        color: fade(theme.palette.primary.contrastText, .6),

        "&:hover": {
            color: theme.palette.primary.contrastText
        },
        "&$tabSelected": {
            color: theme.palette.primary.contrastText
        },
        "&:focus": {
            color: theme.palette.primary.contrastText
        },
    },
    tabSelected: {},
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Votes extends React.Component {
    state = {
        value: 0,
        itemOpen: null,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    handleTalkClicked = talk => {
        this.setState({ itemOpen: talk });
    };

    handleDialogClose = () => {
        this.setState({ itemOpen: null });
    };

    render() {
        const { classes, schedule, votes } = this.props;

        const nonTechnical = schedule.filter(talk => talk.type !== Talk.TYPE_TECHNICAL);

        const firtDayEnd = new Date("2018-09-06T00:00:00");
        const firstDaySchedule = nonTechnical.filter(talk => talk.start < firtDayEnd);
        const secondDaySchedule = nonTechnical.filter(talk => talk.start > firtDayEnd);

        return (
            <div className={classes.root}>
                <AppBar position="sticky" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                    >
                        <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Środa" />
                        <Tab classes={{ root: classes.tabRoot, selected: classes.tabSelected }} label="Czwartek" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    animateHeight
                    resistance
                    disabled
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                    style={{ width: "100vw" }}
                >
                    <div>
                        {firstDaySchedule.map(talk => <ScheduleItem
                            key={talk.id}
                            talk={talk}
                            userVotes={votes}
                            onClick={() => this.handleTalkClicked(talk)}
                        />)}
                    </div>
                    <div>
                        {secondDaySchedule.map(talk => <ScheduleItem
                            key={talk.id}
                            talk={talk}
                            userVotes={votes}
                            onClick={() => this.handleTalkClicked(talk)}
                        />)}
                    </div>
                </SwipeableViews>
                <Dialog
                    fullScreen
                    open={!!this.state.itemOpen}
                    onClose={this.handleDialogClose}
                    TransitionComponent={Transition}
                ><TalkVoteView talk={this.state.itemOpen} userVotes={votes} onClose={this.handleDialogClose} /></Dialog>
            </div>
        );
    }
}

Votes.propTypes = {
    classes: PropTypes.object.isRequired,
    schedule: PropTypes.array,
    speakers: PropTypes.object,
    votes: PropTypes.object
};

export default withStyles(styles)(Votes);
