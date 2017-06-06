import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Talk from "../../domain/Talk";
import { toDatetimeLocalPretty, toTimeLocal } from "../../utils/date";
import CardActions from "../../../node_modules/@material-ui/core/CardActions/CardActions";
import Avatars from "../Avatars/Avatars";

const styles = theme => ({
    root: {
        overflow: "initial"
    },
    card: {
        backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/atm-voting.appspot.com/o/alvernia-bg.jpg?alt=media&token=d26be066-18d8-41d8-8260-c7a221570292)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "200px",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        padding: theme.spacing.unit * 4
    },
    heading: {
        color: theme.palette.grey[200],
        textShadow: "1px 1px #000"
    },
    paragraph: {
        color: theme.palette.grey[200],
        textShadow: "1px 1px #000"
    },
    speaker: {
    }
});

const FeaturedItem = ({ classes, talk }) => {
    const startDate = toDatetimeLocalPretty(talk.start);
    const endTime = toTimeLocal(talk.end);
    const hasSpeakers = talk.speakers && talk.speakers.length;

    const dateFormatted = startDate + (talk.end ? ` - ${endTime}`: "");

    return (
        <Card className={classes.root} square>
            <CardContent className={classes.card}>
                <Typography className={classes.heading} gutterBottom variant="headline" component="h2">
                    {talk.title}
                </Typography>
                <Typography component="p" className={classes.paragraph}>
                    {dateFormatted}
                </Typography>
            </CardContent>
            {
                hasSpeakers
                    ? <div className={classes.speaker}>
                        <CardActions>
                            <Avatars speakers={talk.speakers}/>
                            <Typography color="secondary">
                                {talk.speakers.map(speaker => speaker.name).join(", ")}
                            </Typography>
                        </CardActions>
                    </div>
                    : null
            }
        </Card>
    );
};

FeaturedItem.propTypes = {
    classes: PropTypes.object.isRequired,
    talk: PropTypes.instanceOf(Talk)
};

export default withStyles(styles)(FeaturedItem);
