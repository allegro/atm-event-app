import {
    cyan500,
    darkBlack,
    deepOrange100,
    deepOrange500,
    deepOrangeA200,
    indigo100,
    indigo500,
    indigo700,
    fullBlack,
    grey300,
    orange500,
    white
} from 'material-ui/styles/colors';
import {fade} from "material-ui/utils/colorManipulator";

export default {
    palette: {
        primary1Color: indigo500,
        primary2Color: indigo700,
        primary3Color: indigo100,
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
        ratingStarsColor: orange500
    },
    appBar: {
        // height: 50,
    }
}