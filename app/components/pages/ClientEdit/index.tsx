import * as React from 'react';
import { Component } from 'react';
// import { withLocalize, Translate } from "react-localize-redux";
import * as classNames from 'classnames/bind';

import styles from './styles.module.scss';


const cx = classNames.bind(styles);



class ClientEdit extends Component {
    render() {
        return (
            <div className={ cx(styles.style) }>
                Edit Client
            </div>
        );
    }
}

export default ClientEdit;
