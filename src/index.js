import React from "react";
import ReactDOM from "react-dom";

import createRoutes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import { history, createAppStore } from "./store";

import App from "./containers/App";

const store = createAppStore();
const routes = createRoutes(store);

ReactDOM.render(<App store={store} history={history} routes={routes} />, document.getElementById("root"));

registerServiceWorker();
