import React from "react";
import PropTypes from "prop-types";
import {compose} from "recompose";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {UserIsAuthenticated} from "../../utils/router";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Avatar from "@material-ui/core/Avatar/Avatar";
import IdentityIcon from "@material-ui/icons/PermIdentity";
import IconButton from "@material-ui/core/IconButton/IconButton";
import StarIcon from "@material-ui/icons/Star";
import CommentIcon from "@material-ui/icons/Comment";

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

function HomePage(props) {
    const {classes, schedule} = props;
    return <div>
        <Card>
            <CardContent className={classes.topCard}>
                <Typography className={classes.topHeading} gutterBottom variant="headline" component="h2">
                    Tytuł wystąpienia
                </Typography>
                <Typography component="p" className={classes.topParagraph}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aut, natus. Cupiditate dolores eaque
                    eos expedita ipsa iste recusandae sint, vero voluptas! Dicta dolorem ex, ipsum iure saepe ullam ut.
                </Typography>
            </CardContent>
            <CardActions>
                <Avatar>
                    <IdentityIcon/>
                </Avatar>
                <div>
                    <Typography>Name Surname</Typography>
                    <Typography>8 till end</Typography>
                </div>
                <IconButton aria-label="Star" style={{marginLeft: "auto"}}>
                    <StarIcon/>
                </IconButton>
                <IconButton aria-label="Comment">
                    <CommentIcon/>
                </IconButton>
            </CardActions>
        </Card>
        <Typography variant="headline" >Kolejne wystąpienia</Typography>
        {isLoaded(schedule) ? schedule.map(day => <div key={day.id}>{day.id} / {day.date.toDate().toString()}</div>) : null}
    </div>;
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    UserIsAuthenticated,
    firestoreConnect(["schedule"]),
    connect((state, props) => ({
        schedule: state.firestore.ordered.schedule
    })),
    withStyles(styles)
)(HomePage);
