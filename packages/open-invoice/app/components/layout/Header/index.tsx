import * as React from 'react';
import { Component } from 'react';
import * as classNames from 'classnames/bind';
// import { withLocalize, Translate } from "react-localize-redux";

import styles from './styles.module.scss';

import logoImage from '../../../assets/images/logo.png';


const cx = classNames.bind(styles);


class Header extends Component {
    render() {
        return (
            <div className={ cx(styles.headerContainer) }>
                <div className={ cx(styles.header) }>
                    <img src={logoImage} height="100px" />
                    <span>Open Invoice</span>
                </div>
            </div>
        );
    }
}

export default Header;
