// @flow
import React, {Component} from 'react';
import './App.css';

class App extends Component {
    goTo(route: string) {
        this.props.history.replace(`/${route}`)
    }

    render() {
        const {isAuthenticated, userHasScopes} = this.props.auth;

        return (
            <div id="app">
                <header>
                    <h2>ATM voting engine</h2>
                    <div>
                        <div>
                            <button onClick={this.goTo.bind(this, 'home')}>Home</button>
                            {!isAuthenticated() && (<button onClick={() => this.props.auth.login()}>Log In</button>)}
                            {isAuthenticated() && (<button onClick={this.goTo.bind(this, 'profile')}>Profile</button>)}
                            {isAuthenticated() && userHasScopes(['atmadmin']) && (
                                <button onClick={this.goTo.bind(this, 'admin')}>Admin</button>)}
                            {isAuthenticated() && (<button onClick={() => this.props.auth.logout()}>Log Out</button>)}
                            <button onClick={this.goTo.bind(this, 'speakers')}>Speakers</button>
                        </div>
                    </div>
                </header>
                <footer>
                    footer
                </footer>
            </div>
        );
    }
}

export default App;
