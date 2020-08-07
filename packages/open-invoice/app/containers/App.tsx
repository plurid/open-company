import * as React from 'react';
import { Component } from 'react';



export default class App extends Component {
    render() {
        const { children } = this.props;
        return <React.Fragment>{children}</React.Fragment>;
    }
}
