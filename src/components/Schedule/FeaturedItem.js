import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Avatar from "@material-ui/core/Avatar/Avatar";
import IdentityIcon from "@material-ui/icons/PermIdentity";
import IconButton from "@material-ui/core/IconButton/IconButton";
import StarIcon from "@material-ui/icons/Star";
import CommentIcon from "@material-ui/icons/Comment";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Talk from "../../domain/Talk";
import moment from "moment";

const styles = theme => ({
    root: {
        overflow: "initial"
    },
    topCard: {
        backgroundImage: "url(https://subwallpaper.com/Widescreen-Wallpapers/google-now-wallpaper-photo-For-Widescreen-Wallpaper.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "200px",
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

//TODO: should we keep full date in db?
const FeaturedItem = ({classes, talk}) => (
    <Card className={classes.root}>
        <CardContent className={classes.topCard}>
            <Typography className={classes.topHeading} gutterBottom variant="headline" component="h2">
                {talk.title}
            </Typography>
            <Typography component="p" className={classes.topParagraph}>
                {talk.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Avatar>
                <IdentityIcon/>
            </Avatar>
            <div>
                <Typography>{talk.speaker.name}</Typography>
                <Typography>{moment(talk.start).fromNow()}</Typography>
            </div>
            <IconButton aria-label="Star" style={{marginLeft: "auto"}}>
                <StarIcon/>
            </IconButton>
            <IconButton aria-label="Comment">
                <CommentIcon/>
            </IconButton>
        </CardActions>
    </Card>
);

FeaturedItem.propTypes = {
    classes: PropTypes.object.isRequired,
    talk: PropTypes.instanceOf(Talk)
};

export default withStyles(styles)(FeaturedItem);