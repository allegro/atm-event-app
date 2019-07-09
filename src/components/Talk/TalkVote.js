import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withFirestore } from "react-redux-firebase";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Avatar from "@material-ui/core/Avatar/Avatar";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Rating from "../Rating/Rating";
import MySnackbarContentWrapper from "../Notification";

const styles = theme => ({
    appBar: {
        position: "relative",
    },
    flex: {
        flex: 1,
    },
    talkDetails: {
        padding: theme.spacing(3),
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
        marginBottom: theme.spacing(1),
    },
    talkTitle: {
        textAlign: "center",
        fontSize: "16px",
        color: theme.palette.grey[600],
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    talkDescription: {
        textAlign: "justify",
        fontSize: "16px",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    voteHeader: {
        textAlign: "center",
        fontSize: "13px",
        color: theme.palette.grey[600],
        paddingTop: theme.spacing(4),
    },
    commentTextField: {
        width: "100%",
    },
    commentBtn: {
        margin: "0 auto",
        display: "block"
    },
});

class TalkVoteDialog extends Component {
    constructor(props) {
        super(props);
        this.commentInput = React.createRef();
    }

    state = {
        open: false,
    };

    showSuccessInfo = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ open: false });
    };

    onVote = (score) => {
        const { firestore, firebase } = this.props;
        const uid = firebase.auth().currentUser.uid;

        const userVote = firestore
            .collection(`/users/${uid}/votes`)
            .doc(this.props.talk.id);

        userVote.set({
            score,
            updatedAt: firestore.FieldValue.serverTimestamp()
        }, { merge: true }).then(this.showSuccessInfo);
    };

    onCommentSave = event => {
        const { firestore, firebase } = this.props;
        const uid = firebase.auth().currentUser.uid;

        const userVote = firestore
            .collection(`/users/${uid}/votes`)
            .doc(this.props.talk.id);

        userVote.set({
            comment: this.commentInput.current.value,
            updatedAt: firestore.FieldValue.serverTimestamp()
        }, { merge: true }).then(this.showSuccessInfo);
    };

    render() {
        const { props } = this;
        const { classes, talk, userVotes, onClose } = props;

        if (!talk) return <div/>;

        const voteObject = userVotes && userVotes[talk.id];
        const score = voteObject ? voteObject.score : 0;
        const comment = voteObject ? voteObject.comment : "";

        const isStarted = new Date().getTime() < talk.start;

        return (
            <div>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={onClose} aria-label="Close">
                            <ArrowBackIcon/>
                        </IconButton>
                        <Typography variant="caption" color="inherit" className={classes.flex}>
                            Oceń wystąpienie
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.talkDetails}>
                    <Grid container>
                        {talk.speakers.map(speaker => (<Grid key={speaker.id} item xs className={classes.speakerItem}>
                            <Avatar className={classes.speakerAvatar} alt={speaker.name} src={speaker.photo}/>
                            <Typography color="secondary">{speaker.name}</Typography>
                        </Grid>))}
                    </Grid>
                    <Typography className={classes.talkTitle}>{talk.title}</Typography>

                    <Divider/>
                    {isStarted ? <Typography style={{padding: 10}} color="secondary" variant="body1" align="center">
                        Za wcześnie na oceny i komentarze!
                    </Typography> : <div>
                        <Typography className={classes.voteHeader} variant="caption">
                            Twoja ocena:
                        </Typography>
                        <Rating value={score} max={5} onChange={this.onVote}/>
                        <Typography className={classes.voteHeader} variant="caption">
                            Twój komentarz:
                        </Typography>

                        <TextField
                            multiline
                            defaultValue={comment}
                            className={classes.commentTextField}
                            margin="normal"
                            inputProps={{
                                ref: this.commentInput
                            }}
                        />
                        <Button onClick={this.onCommentSave} className={classes.commentBtn}>Wyślij</Button>
                    </div>}
                </div>

                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                >
                    <MySnackbarContentWrapper
                        onClose={this.handleClose}
                        variant="success"
                        message="Dzięki! Zapisane!"
                    />
                </Snackbar>

            </div>
        );
    }
}

TalkVoteDialog.propTypes = {
    talk: PropTypes.object,
    userVotes: PropTypes.object,
    firebase: PropTypes.object,
    firestore: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    withFirestore
)(TalkVoteDialog);
