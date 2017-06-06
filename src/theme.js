import "typeface-roboto";

const flatElevation = "0px 1px 5px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.04), 0px 2px 3px -1px rgba(0, 0, 0, 0.02)";
const atmBlue = "#354E97";
const atmPink = "#ed1652";

export default {
    palette: {
        primary: {
            main: atmBlue
        },
        secondary: {
            main: atmPink
        }
    },
    shadows: [
        "none",
        ...[...new Array(24)].map(() => flatElevation)
    ]
};
