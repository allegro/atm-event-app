import {
    cyan500,
    darkBlack,
    deepOrange100,
    deepOrange500,
    deepOrangeA200,
    deepPurple100,
    deepPurple500,
    deepPurple700,
    fullBlack,
    grey300,
    white
} from 'material-ui/styles/colors';
import {fade} from "material-ui/utils/colorManipulator";

export default {
    palette: {
        primary1Color: deepPurple500,
        primary2Color: deepPurple700,
        primary3Color: deepPurple100,
        accent1Color: deepOrangeA200,
        accent2Color: deepOrange100,
        accent3Color: deepOrange500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    appBar: {
        height: 50,
    },
}