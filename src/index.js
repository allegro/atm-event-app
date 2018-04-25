import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase";

import { firebase as firebaseConfig } from "./config";
import { history, createAppStore } from "./store";
import createRoutes from "./routes";
import registerServiceWorker from './registerServiceWorker';

import App from "./containers/App";

firebase.initializeApp(firebaseConfig);

const store = createAppStore();
const routes = createRoutes(store);

ReactDOM.render(<App store={store} history={history} routes={routes} />, document.getElementById("root"));

registerServiceWorker();