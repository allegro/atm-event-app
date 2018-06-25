import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Talk from "../../domain/Talk";
import ScheduleItemActions from "./ScheduleItemActions";

const styles = theme => ({
    root: {
        overflow: 'initial'
    },
    card: {
        backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/atm-voting.appspot.com/o/google-now-wallpaper-photo-For-Widescreen-Wallpaper.jpg?alt=media&token=5482cb8e-7aab-42b1-a7d7-ec387880c252)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '200px',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        padding: theme.spacing.unit * 4
    },
    heading: {
        color: theme.palette.grey[200],
        textShadow: '1px 1px #000'
    },
    paragraph: {
        color: theme.palette.grey[200],
        textShadow: '1px 1px #000'
    },
    speaker: {
    }
});

const FeaturedItem = ({classes, talk}) => (
    <Card className={classes.root} square>
        <CardContent className={classes.card}>
            <Typography className={classes.heading} gutterBottom variant="headline" component="h2">
                {talk.title}
            </Typography>
            <Typography component="p" className={classes.paragraph}>
                {truncate(talk.description, 150)}
            </Typography>
        </CardContent>
        {talk.speakers ? <div className={classes.speaker}>
            <ScheduleItemActions startsAt={talk.start} speakers={talk.speakers}/>
        </div> : undefined}
    </Card>
);

function truncate(str, limit) {
    const trimmable = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';
    const reg = new RegExp('(?=[' + trimmable + '])');
    const words = str.split(reg);
    let count = 0;
    return words.filter(function(word) {
        count += word.length;
        return count <= limit;
    }).join('').concat('…');
}

FeaturedItem.propTypes = {
    classes: PropTypes.object.isRequired,
    talk: PropTypes.instanceOf(Talk)
};

export default withStyles(styles)(FeaturedItem);