import * as React from "react";
import {RaisedButton, TextField} from "material-ui";

export default class Login extends React.Component {

    handleClick() {
        this.props.auth.login(this.login.input.value, this.password.input.value);
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Enter your Username"
                    floatingLabelText="Username"
                    ref={(input) => {
                        this.login = input;
                    }}
                    onChange={(event, newValue) => this.setState({username: newValue})}
                />
                <br/>
                <TextField
                    type="password"
                    hintText="Enter your Password"
                    floatingLabelText="Password"
                    ref={(input) => {
                        this.password = input;
                    }}
                    onChange={(event, newValue) => this.setState({password: newValue})}
                />
                <br/>
                <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
            </div>
        )
    }
}