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

const mapImage = "https://firebasestorage.googleapis.com/v0/b/atm-voting.appspot.com/o/alvernia-map.png?alt=media&token=b5302ff1-cdb7-440a-a6a8-1ae6c5420486";

const MapPage = ({ classes, pages }) => {
    const { map } = pages;

    return <div>
        <Typography className={classes.sectionHeader} variant="h5">Otwórz w mapach</Typography>
        <Card className={classes.card} square>
            <ButtonBase
                className={classes.cardAction}
                onClick={() => window.open("https://goo.gl/maps/6NFKuD6cC832")}
            >
                <CardMedia
                    className={classes.cover}
                    image="https://firebasestorage.googleapis.com/v0/b/atm-voting.appspot.com/o/alvernia-bg.jpg?alt=media&token=d26be066-18d8-41d8-8260-c7a221570292"
                    title="Alvernia planet"
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="subtitle1">Alvernia Planet</Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            Ferdynanda Wspaniałego 1<br />
                            32-566 Alwernia
                        </Typography>
                    </CardContent>
                </div>
            </ButtonBase>
        </Card>

        <Typography className={classes.sectionHeader} variant="h5">Schemat Alvernii</Typography>
        <Card className={classes.root} square>
            <CardMedia
                className={classes.media}
                image={mapImage}
                title="Schemat Alvernia Studios"
            />
            <CardContent className={classes.cardContent}>
                <Typography dangerouslySetInnerHTML={{ __html: map.html }} />
            </CardContent>
        </Card>

    </div>;
};

MapPage.propTypes = {
    classes: PropTypes.object.isRequired,
    pages: PropTypes.object
};

export default compose(withStyles(styles))(MapPage);
