import * as React from "react";
import {LinearProgress, Paper, RaisedButton, TextField} from "material-ui";

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {loading: false, error: null};
    }

    handleSubmit(event) {
        this.setState({loading: true});
        let login = this.login.input.value;
        if (!login.split('@')[1]) login = login + '@allegrogroup.com';
        this.props.auth.login(login, this.password.input.value).then(() => {
            console.log('Login complete, redirect!');
        }).catch((error) => {
            this.setState({loading: false, error: error.message});
        });
        event.preventDefault();
    }

    render() {
        return (
            <Paper style={{padding: 30, margin: 30, textAlign: 'center', display: 'flex', flexDirection: 'column'}} zDepth={1}>
                {this.state.loading ? <LinearProgress mode="indeterminate"/> : null}
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        hintText="bartosz.galek" floatingLabelText="login" ref={(input) => this.login = input}
                        fullWidth={true} type="text" onChange={(event, newValue) => this.setState({username: newValue, error: null})}/>
                    <TextField type="password" hintText="wprowadź hasło z identyfikatora" floatingLabelText="hasło"
                               errorText={this.state.error}
                               fullWidth={true} ref={(input) => this.password = input}
                               onChange={(event, newValue) => this.setState({password: newValue, error: null})}/>
                    <RaisedButton type="submit" style={{marginTop: '30px'}} label="zaloguj" primary={true}
                                  onClick={(event) => this.handleSubmit(event)}/>
                </form>
            </Paper>
        )
    }
}