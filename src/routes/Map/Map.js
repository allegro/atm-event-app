import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import ButtonBase from "@material-ui/core/ButtonBase";

const styles = theme => ({

    mapImage: {
        width: "100%"
    },
    root: {
    },
    imageCard: {
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "200px",
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        padding: theme.spacing(4)
    },
    heading: {
        textShadow: "1px 1px #000"
    },
    card: {
        display: "flex",
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        flex: "1 0 auto",
    },
    cover: {
        width: 125,
        height: 125,
    },
    cardAction: {
        textAlign: "initial",
        display: "flex",
    },
    media: {
        height: 0,
        paddingTop: "77.28395062%", // 810:626
    },
    sectionHeader: {
        color: theme.palette.grey[500],
        fontWeight: 300,
        padding: theme.spacing(3)
    }
});

const MapPage = ({ classes }) => {
    return <div>
        <Typography className={classes.sectionHeader} variant="h5">Otwórz w mapach</Typography>
        <Card className={classes.card} square>
            <ButtonBase
                className={classes.cardAction}
                onClick={() => window.open("https://goo.gl/maps/UwFSNWiAuVPcBCrH9")}
            >
                <CardMedia
                    className={classes.cover}
                    image="https://firebasestorage.googleapis.com/v0/b/atm-voting.appspot.com/o/multikino.jpg?alt=media&token=511a24a0-ba53-44cc-83de-bcedca9b06b4"
                    title="Złote Tarasy"
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="subtitle1">Multikino Złote Tarasy</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Złota 59<br />
                            00-120 Warszawa
                        </Typography>
                    </CardContent>
                </div>
            </ButtonBase>
        </Card>
    </div>;
};

MapPage.propTypes = {
    classes: PropTypes.object.isRequired,
    pages: PropTypes.object
};

export default compose(withStyles(styles))(MapPage);
