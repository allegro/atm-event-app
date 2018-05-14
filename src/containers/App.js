import React, { Component } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ConnectedRouter } from "react-router-redux";
import { Provider } from "react-redux";

import BaseLayout from "../layouts/BaseLayout";
import Theme from "../theme";

const theme = createMuiTheme(Theme);

class AppContainer extends Component {
    static propTypes = {
        routes: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        const { routes, store, history } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <BaseLayout>
                            <div>
                                {routes}
                            </div>
                        </BaseLayout>
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default AppContainer;