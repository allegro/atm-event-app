import * as React from "react";
import {Paper, RaisedButton, TextField} from "material-ui";
import ActionLock from 'material-ui/svg-icons/action/lock';

export default class Login extends React.Component {

    handleSubmit(event) {
        this.props.auth.login(this.login.input.value, this.password.input.value);
        event.preventDefault();
    }

    render() {
        return (
            <Paper style={{padding: 30, margin: 30, textAlign: 'center', display: 'flex', flexDirection: 'column'}} zDepth={1}>
                <ActionLock style={{width: '100%', height: '75px'}}/>
                <form onSubmit={this.handleSubmit}>
                    <TextField hintText="wprowadź email" floatingLabelText="email"
                               ref={(input) => {
                                   this.login = input;
                               }}
                               fullWidth={true}
                               type="email"
                               onChange={(event, newValue) => this.setState({username: newValue})}
                    />
                    <TextField
                        type="password"
                        hintText="wprowadź hasło"
                        floatingLabelText="hasło"
                        fullWidth={true}
                        ref={(input) => {
                            this.password = input;
                        }}
                        onChange={(event, newValue) => this.setState({password: newValue})}
                    />
                    <RaisedButton type="submit" style={{marginTop: '30px'}} label="zaloguj" primary={true}
                                  onClick={(event) => this.handleSubmit(event)}/>
                </form>
            </Paper>
        )
    }
}