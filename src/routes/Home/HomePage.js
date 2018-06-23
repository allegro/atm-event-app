import React from "react";
import PropTypes from "prop-types";
import {compose} from "recompose";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {UserIsAuthenticated} from "../../utils/router";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import FeaturedItem from "../../components/Schedule/FeaturedItem";
import Talk from "../../domain/Talk";
import Speaker from "../../domain/Speaker";
import ScheduleItem from "../../components/Schedule/ScheduleItem";
import LoadingSpinner from "../../components/LoadingSpinner";

import BaseLayout from "../../layouts/BaseLayout";

const styles = theme => ({
    topCard: {
        backgroundImage: "url(https://subwallpaper.com/Widescreen-Wallpapers/google-now-wallpaper-photo-For-Widescreen-Wallpaper.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "200px",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column"
    },
    topHeading: {
        color: theme.palette.grey[200],
        textShadow: "1px 1px #000"
    },
    topParagraph: {
        color: theme.palette.grey[200],
        textShadow: "1px 1px #000"
    }
});

function getFeaturedTalk(schedule) {
    //TODO: make real logic :)
    const scheduleElement = schedule[0];
    const example = scheduleElement.agenda[2];
    const start = new Date(scheduleElement.date.seconds * 1000);
    start.setHours(example.start.split(":")[0]);
    start.setMinutes(example.start.split(":")[1]);
    const end = new Date(scheduleElement.date.seconds * 1000);
    end.setHours(example.end.split(":")[0]);
    end.setMinutes(example.end.split(":")[1]);
    return new Talk(example.title, example.content, new Speaker(example.speaker.name, example.speaker.photo), start, end);
}

function HomePage(props) {
    const { schedule } = props;

    if (!isLoaded(schedule)) return <BaseLayout><LoadingSpinner /></BaseLayout>;

    return <BaseLayout>
        <FeaturedItem talk={getFeaturedTalk(schedule)}/>
        <Typography variant="headline">Kolejne wystąpienia</Typography>
        {schedule[0].agenda.map(talk => <ScheduleItem key={talk.title} talk={talk}/>)}
    </BaseLayout>;
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    schedule: PropTypes.array
};

export default compose(
    UserIsAuthenticated,
    firestoreConnect(["schedule"]),
    connect((state) => ({
        schedule: state.firestore.ordered.schedule
    })),
    withStyles(styles)
)(HomePage);
