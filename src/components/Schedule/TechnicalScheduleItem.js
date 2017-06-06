import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import EventIcon from "@material-ui/icons/Event";
import Talk from "../../domain/Talk";
import { toTimeLocal } from "../../utils/date";
import { withStyles } from "@material-ui/core/styles";
import SvgIcon from "../../../node_modules/@material-ui/core/SvgIcon/SvgIcon";
import {
    AfterPartyIcon,
    BreakIcon, EndingIcon,
    KeynoteClosingIcon,
    KeynoteOpeningIcon,
    LunchBreakIcon,
    OpeningIcon
} from "../../icons";

const styles = theme => ({
    root: {},
    content: {
        backgroundColor: '#ECEFF1',
    },
    title: {
        color: '#d9dfe4',
        fontSize: "1.3em",
        fontWeight: 300
    },
    subheader: {
        color: '#84848F',
    },
    avatar: {
        color: '#768592',
        backgroundColor: '#d9dfe4'
    },
    icon: {}
});

const TechnicalScheduleItem = ({ classes, talk }) => {

    const startTime = toTimeLocal(new Date(talk.start));
    const endTime = toTimeLocal(new Date(talk.end));
    const displayTime = <span className={classes.subheader}>{startTime + (endTime ? ` - ${endTime}` : "")}</span>;

    function renderIcon(title) {
        if (title === 'Rozpoczęcie konferencji' || title === 'Rozpoczęcie')
            return <SvgIcon className={classes.icon} style={{ marginLeft: 3, height: 24 }}>{OpeningIcon}</SvgIcon>;

        if (title === 'Keynote Opening')
            return <SvgIcon className={classes.icon}
                            style={{ marginLeft: 5, marginTop: 5 }}>{KeynoteOpeningIcon}</SvgIcon>;

        if (title === 'Przerwa')
            return <SvgIcon className={classes.icon} style={{ marginLeft: 10, marginTop: 3 }}>{BreakIcon}</SvgIcon>;

        if (title === 'Przerwa obiadowa')
            return <SvgIcon className={classes.icon} style={{ marginLeft: 3, marginTop: 5 }}>{LunchBreakIcon}</SvgIcon>;

        if (title === 'Keynote Closing')
            return <SvgIcon className={classes.icon}
                            style={{ marginLeft: 2, marginTop: 4 }}>{KeynoteClosingIcon}</SvgIcon>;

        if (title === 'Zakończenie dnia I' || title === 'Zakończenie')
            return <SvgIcon className={classes.icon} style={{ marginLeft: 7, marginTop: 5 }}>{EndingIcon}</SvgIcon>;

        if (title === 'Grill + after party')
            return <SvgIcon className={classes.icon}>{AfterPartyIcon}</SvgIcon>;

        return <EventIcon className={classes.icon}/>;
    }

    return (
        <Card className={classes.root} square>
            <CardHeader
                avatar={<Avatar className={classes.avatar}>{renderIcon(talk.title)}</Avatar>}
                title={talk.title}
                subheader={displayTime}
                className={classes.content}
            />
        </Card>
    );
};

TechnicalScheduleItem.propTypes = {
    classes: PropTypes.object.isRequired,
    talk: PropTypes.instanceOf(Talk)
};

export default withStyles(styles)(TechnicalScheduleItem);
