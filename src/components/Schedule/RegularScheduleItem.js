import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import ScheduleItemActions from "./ScheduleItemActions";
import LightningTalkChip from "../Talk/LightningTalkChip";
import Talk from "../../domain/Talk";
import { withStyles } from "@material-ui/core/styles";

const noop = () => {};

const styles = theme => ({
    root: {
        paddingBottom: theme.spacing(2),
    },
    content: {
        padding: `${theme.spacing(2)}px 0 0 ${theme.spacing(2)}px`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: theme.palette.grey[700],
        fontSize: "1.3em",
        fontWeight: 300
    },
    cardAction: {
        display: "block",
        width: "100%",
        textAlign: "initial"
    }
});

const RegularScheduleItem = ({ classes, talk, userVotes, onClick = noop }) => {
    const voteObject = userVotes && userVotes[talk.id];
    const userVoted = !!voteObject;

    return (
        <ButtonBase
            component="div"
            className={classes.cardAction}
            onClick={onClick}
        >
            <Card className={classes.root} square>
                <CardContent className={classes.content}>
                    <Typography className={classes.title} gutterBottom variant="caption" component="h2">
                        {talk.title}
                    </Typography>
                    {talk.isLightning() ? <LightningTalkChip /> : null}
                </CardContent>
                {talk.speakers
                    ? <ScheduleItemActions
                        startsAt={talk.start}
                        endsAt={talk.end}
                        speakers={talk.speakers}
                        userVoted={userVoted}
                        score={userVoted ? voteObject.score : null}
                    />
                    : null}
            </Card>
        </ButtonBase>
    );
};

RegularScheduleItem.propTypes = {
    classes: PropTypes.object.isRequired,
    userVotes: PropTypes.object,
    talk: PropTypes.instanceOf(Talk),
    onClick: PropTypes.func
};

export default withStyles(styles)(RegularScheduleItem);
