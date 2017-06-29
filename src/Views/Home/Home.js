// @flow
import React, {Component} from 'react';
import './Home.css';
import {Card, CardHeader, CardMedia, CardTitle} from "material-ui";

export default class Home extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardMedia overlay={<CardTitle title="Tytuł wystąpienia"
                                                   subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin."/>}>
                        <img src="https://www.pixelstalk.net/wp-content/uploads/2016/04/Google-Wallpaper-Good-Full-HD.png" alt=""/>
                    </CardMedia>
                    <CardHeader title="Speaker Speakerowy" subtitle="8 minut do końca"
                                avatar="http://www.material-ui.com/images/jsa-128.jpg"/>
                </Card>
                <h2>Kolejne wystąpienia</h2>
                <Card style={{margin: '30px 0'}}>
                    <CardTitle title="Title Title Title Title Title Title"/>
                    <CardHeader title="Speaker Speakerowy" subtitle="8 minut do końca"
                                avatar="http://www.material-ui.com/images/jsa-128.jpg"/>
                </Card>
                <Card style={{margin: '30px 0'}}>
                    <CardTitle title="Title Title Title Title Title Title"/>
                    <CardHeader title="Speaker Speakerowy" subtitle="8 minut do końca"
                                avatar="http://www.material-ui.com/images/jsa-128.jpg"/>
                </Card>
                <Card style={{margin: '30px 0'}}>
                    <CardTitle title="Title Title Title Title Title Title"/>
                    <CardHeader title="Speaker Speakerowy" subtitle="8 minut do końca"
                                avatar="http://www.material-ui.com/images/jsa-128.jpg"/>
                </Card>
                <Card style={{margin: '30px 0'}}>
                    <CardTitle title="Title Title Title Title Title Title"/>
                    <CardHeader title="Speaker Speakerowy" subtitle="8 minut do końca"
                                avatar="http://www.material-ui.com/images/jsa-128.jpg"/>
                </Card>
            </div>
        )
    }
}
