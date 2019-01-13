import * as React from 'react';
import { Component } from 'react';

const styles = require('./HeaderTitle.scss');
const logoImage = require('../../assets/images/logo.png');



interface IHeaderTitleProps {
    title: string;
}

export default class HeaderTitle extends Component<IHeaderTitleProps, {}> {
    constructor(props: IHeaderTitleProps) {
        super(props);
    }

    render() {
        return (
            <div className={styles.headerContainer}>
                <div className={styles.header}>
                    <img src={logoImage} height="30px" />
                    <span>{ this.props.title }</span>
                </div>
            </div>
        );
    }
}
