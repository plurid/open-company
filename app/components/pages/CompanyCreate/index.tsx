import * as React from 'react';
import { Component } from 'react';
import * as classNames from 'classnames/bind';
// import { withLocalize, Translate } from "react-localize-redux";

import styles from './styles.module.scss';


const cx = classNames.bind(styles);

type Props = {};



class CompanyCreate extends Component {
    constructor(props: Props) {
        super(props);
    }

    handleCreate = () => {
        console.log('create company');
    }

    render() {
        return (
            <div className={ cx(styles.style) }>
                Create Company

                <button onClick={this.handleCreate}>Create Company</button>
            </div>
        );
    }
}

export default CompanyCreate;
