import * as React from 'react';
import { Component } from 'react';

const styles = require('./Header.css');



export default class Header extends Component {
    render() {
        return (
            <div className={styles.headerContainer}>
                <div className={styles.header}>
                    <img src="./assets/images/logo.png" height="100px" />
                    <span>Open Invoice</span>
                </div>
            </div>
        );
    }
}
