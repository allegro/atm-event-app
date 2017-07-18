// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FirebaseAuth from './Auth/Auth';
import {MuiThemeProvider} from "material-ui";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './Config/theme';
import 'moment/locale/pl';
import './index.css';
import App from './Components/App';

import config from './Config/config';

injectTapEventPlugin();

const auth = new FirebaseAuth(config.FIREBASE_CONFIG);

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <App auth={auth}/>
    </MuiThemeProvider>,
    document.querySelector('#app'));
registerServiceWorker();
