import * as React from 'react';
import { Component } from 'react';
// import { withLocalize, Translate } from "react-localize-redux";
import * as classNames from 'classnames/bind';

import styles from './styles.module.scss';


const cx = classNames.bind(styles);



class InvoiceEdit extends Component {
    render() {
        return (
            <div className={ cx(styles.style) }>
                Invoice Edit
            </div>
        );
    }
}

export default InvoiceEdit;
