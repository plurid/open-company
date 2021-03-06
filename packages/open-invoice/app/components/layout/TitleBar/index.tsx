import * as React from 'react';
import { Component } from 'react';
import * as classNames from 'classnames/bind';
// import { withLocalize, Translate } from "react-localize-redux";

import styles from './styles.module.scss';


const cx = classNames.bind(styles);



class TitleBar extends Component {
    render() {
        return (
            <div className={ cx(styles.titleBar) }>
                Open Invoice
            </div>
        );
    }
}

export default TitleBar;
