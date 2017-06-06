import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Avatar from "@material-ui/core/Avatar/Avatar";
import LightningTalkChip from "./LightningTalkChip";

const styles = theme => ({
    appBar: {
        position: "relative",
    },
    flex: {
        flex: 1,
    },
    talkDetails: {
        padding: theme.spacing.unit * 3,
    },
    speakerItem: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    speakerAvatar: {
        width: 70,
        height: 70,
        marginBottom: theme.spacing.unit,
    },
    talkTitle: {
        textAlign: "center",
        fontSize: "16px",
        color: theme.palette.grey[600],
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    talkDescription: {
        textAlign: "justify",
        fontSize: "16px",
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    talkSpeakers: {
        paddingTop: theme.spacing.unit * 3,
    },
    speakerBio: {
        paddingTop: theme.spacing.unit * 3,
        color: theme.palette.grey[600],
        textAlign: "center"
    },
    lightningChip: {
        display: "block",
        paddingBottom: theme.spacing.unit * 2,
    }
});

function TalkDetailsDialog(props) {
    const { classes, talk, onClose } = props;

    if (!talk) return <div />;

    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton color="inherit" onClick={onClose} aria-label="Close">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Wystąpienie
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.talkDetails}>
                <Typography className={classes.talkTitle}>
                    {talk.isLightning() ? <p className={classes.lightningChip}><LightningTalkChip /></p> : null}
                    {talk.title}
                </Typography>
                <Divider />
                {
                    talk.description
                        ? <div>
                            <Typography className={classes.talkDescription}>{talk.description}</Typography>
                            <Divider />
                        </div>
                        : null
                }
                <div className={classes.talkSpeakers}>
                    <Grid container>
                        {talk.speakers.map(speaker => (<Grid key={speaker.id} item xs className={classes.speakerItem}>
                            <Avatar className={classes.speakerAvatar} alt={speaker.name} src={speaker.photo} />
                            <Typography color="secondary">{speaker.name}</Typography>
                        </Grid>))}
                    </Grid>
                    {talk.speakers.map(speaker => (<div key={speaker.id}>
                        <Typography className={classes.speakerBio}>{speaker.bio}</Typography>
                    </div>))}
                </div>
            </div>
        </div>
    );
}

TalkDetailsDialog.propTypes = {
    talk: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TalkDetailsDialog);
