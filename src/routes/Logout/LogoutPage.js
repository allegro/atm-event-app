import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withFirebase } from "react-redux-firebase";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import AtmLogo from "../../components/AtmLogo";
import BareLayout from "../../layouts/BareLayout";

const styles = theme => ({
    container: {
        maxWidth: "400px",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        padding: theme.spacing(2)
    },
    panel: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        ...theme.mixins.gutters({
            paddingTop: 16,
            paddingBottom: 16,
            marginTop: theme.spacing(5)
        })
    },
    thankYouText: {
        margin: theme.spacing(2),
        marginBottom: theme.spacing(3)
    }
});

const LogoutPage = ({ firebase, classes }) => {
    firebase.logout();

    return <BareLayout>
        <div className={classes.container}>
            <AtmLogo width={200} height="auto" />

            <Paper className={classes.panel}>
                <Typography variant="caption" className={classes.thankYouText}>
                    Dzięki! <span role="img" aria-label="">👍</span>
                </Typography>
                <Button
                    color="inherit"
                    variant="outlined"
                    component={props => <Link to="/" {...props} />}
                >
                    Zaloguj się ponownie
                </Button>
            </Paper>
        </div>
    </BareLayout>;
};

LogoutPage.propTypes = {
    firebase: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

export default compose(
    withFirebase,
    withStyles(styles)
)(LogoutPage);
