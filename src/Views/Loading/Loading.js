import * as React from "react";
import {RefreshIndicator} from "material-ui";

export default class Loading extends React.Component {

    render() {
        return (
            <div style={{
                padding: 30,
                margin: 30,
                height: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <RefreshIndicator
                    size={80}
                    left={0}
                    top={0}
                    loadingColor="#FF9800"
                    style={{display: 'flex', top: 0, left: 0, transform: 'none', position: 'static'}}
                    status="loading"
                />
                <h2>Ładowanie...</h2>
            </div>
        )
    }
}