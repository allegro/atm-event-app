import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from "material-ui/Button";
import AnonymousBar from "./Components/ApplicationBar/AnonymousBar";
import BottomMenu from "./Components/BottomMenu/BottomMenu";

class App extends Component {
    render() {
        return (
            <div className="App">
                <AnonymousBar/>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <Button variant="raised" color="primary">
                    Hello World
                </Button>
                <BottomMenu/>
            </div>
        );
    }
}

export default App;
