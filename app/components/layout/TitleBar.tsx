import * as React from 'react';
import { Component } from 'react';
const styles = require('./TitleBar.scss');



export default class TitleBar extends Component {
    render() {
        return (
            <div className={styles['title-bar']}>
                Open Invoice
            </div>
        );
    }
}
