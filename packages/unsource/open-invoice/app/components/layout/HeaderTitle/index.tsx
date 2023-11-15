import * as React from 'react';
import { Component } from 'react';
import * as classNames from 'classnames/bind';
// import { withLocalize, Translate } from "react-localize-redux";

import styles from './styles.module.scss';

import logoImage from '../../../assets/images/logo.png';


const cx = classNames.bind(styles);



interface IHeaderTitleProps {
    title: string;
}

class HeaderTitle extends Component<IHeaderTitleProps, {}> {
    constructor(props: IHeaderTitleProps) {
        super(props);
    }

    render() {
        return (
            <div className={ cx(styles.headerContainer) }>
                <div className={ cx(styles.header) }>
                    <img src={logoImage} height="30px" />
                    <span>{ this.props.title }</span>
                </div>
            </div>
        );
    }
}

export default HeaderTitle;
