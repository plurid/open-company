import * as React from 'react';
import { Component } from 'react';
import * as classNames from 'classnames/bind';
// import { withLocalize, Translate } from "react-localize-redux";

import styles from './styles.module.scss';


const cx = classNames.bind(styles);



class LanguageSelector extends Component {
    render() {
        return (
            <div className={ cx(styles.style) }>
                <select>
                    <option value="en">EN</option>
                    <option value="ro">RO</option>
                    <option value="de">DE</option>
                    <option value="fr">FR</option>
                </select>
            </div>
        );
    }
}

export default LanguageSelector;
