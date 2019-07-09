import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
    bgImage: {
        width: "100%"
    },
    root: {
        overflow: "initial"
    },
    imageCard: {
        backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/atm-voting.appspot.com/o/alvernia-transport.jpg?alt=media&token=06e1548f-8249-4b9f-a798-725490f04159)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "200px",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        padding: theme.spacing(4)
    },
    heading: {
        color: theme.palette.grey[200],
        textShadow: "1px 1px #000"
    },
});

const MapPage = ({ classes, pages }) => {
    const { directions } = pages;

    return <div>
        <Card className={classes.root} square>
            <CardContent className={classes.imageCard}>
                <Typography className={classes.heading} gutterBottom variant="caption" component="h2">
                    Dojazd
                </Typography>
            </CardContent>
        </Card>
        <Card className={classes.root} square>
            <CardContent className={classes.card}>
                <Typography dangerouslySetInnerHTML={{ __html: directions.html }} />
            </CardContent>
        </Card>
    </div>;
};

MapPage.propTypes = {
    classes: PropTypes.object.isRequired,
    pages: PropTypes.object
};

export default compose(withStyles(styles))(MapPage);
