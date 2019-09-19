import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import ButtonBase from "@material-ui/core/ButtonBase";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


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
        padding: theme.spacing(2)
    }
});

const PoiCard = ({ classes, name, mapUrl, imageSrc, address1, address2 }) => (
    <Card className={classes.card} square>
        <ButtonBase
            className={classes.cardAction}
            onClick={() => window.open(mapUrl)}
        >
            <CardMedia className={classes.cover} image={imageSrc} title={name} />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="subtitle1">{name}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {address1}<br />
                        {address2}
                    </Typography>
                </CardContent>
            </div>
        </ButtonBase>
    </Card>
);

const InfoPage = ({ classes, settings }) => {
    const { wifi, poiEvent, poiHotel1, poiHotel2, poiParty } = settings;

    const wifiInfo = (wifi.ssid && wifi.pass)
        ? <Fragment>
            <Typography className={classes.sectionHeader} variant="h5">Konferencyjne WiFi</Typography>
            <Card>
                <Table>
                    <TableBody>
                        <TableRow><TableCell>sieć:</TableCell><TableCell>{wifi.ssid}</TableCell></TableRow>
                        <TableRow><TableCell>hasło:</TableCell><TableCell>{wifi.pass}</TableCell></TableRow>
                    </TableBody>
                </Table>
            </Card>
        </Fragment>
        : null;

    const partyInfo = !poiParty.name.startsWith('?')
        ? (
            <Fragment>
                <Typography className={classes.sectionHeader} variant="h5">Party</Typography>
                <PoiCard classes={classes} {...poiParty} />
            </Fragment>
        )
        : null;

    return <div>
        {wifiInfo}
        {partyInfo}

        <Typography className={classes.sectionHeader} variant="h5">Konferencja</Typography>
        <PoiCard classes={classes} {...poiEvent} />

        <Typography className={classes.sectionHeader} variant="h5">Hotele</Typography>
        <PoiCard classes={classes} {...poiHotel1} />
        <PoiCard classes={classes} {...poiHotel2} />
    </div>;
};

InfoPage.propTypes = {
    classes: PropTypes.object.isRequired,
    settings: PropTypes.object
};

export default compose(withStyles(styles))(InfoPage);
