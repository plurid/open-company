import * as fs from 'fs';

import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import * as classNames from 'classnames/bind';

import styles from './styles.module.scss';

import * as routes from '../../../constants/routes.json';

import Header from '../../layout/Header';
import LanguageSelector from '../../layout/LanguageSelector';



const { dialog } = require('electron').remote;

const cx = classNames.bind(styles);

type Props = {};


class Intro extends Component<Props> {
    props: Props;

    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: any) {
        if (event.target.name === "createDb") {
            dialog.showSaveDialog({ defaultPath: 'open-invoice.db' }, (fileName) => {
                if (fileName === undefined){
                    console.log("file not saved");
                    return;
                }

                console.log(fileName);
                const content = '';
                fs.writeFile(fileName, content, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('written file ', fileName);
                });
            });
        }


        if (event.target.name === "selectDb") {
            dialog.showOpenDialog({properties: ['openFile']}, (filePaths) => {
                if (filePaths) {
                    const file = filePaths[0];
                    console.log(file);

                    fs.readFile(file, 'utf8', (err, data) => {
                        if (err) {
                            throw err;
                        }
                        console.log(data);
                    });
                }
            });
        }
    }

    render() {
        return (
            <div style={ {height: '100%', display: 'grid', gridTemplateRows: '200px auto' } }>
                <Header />
                <div className={ cx(styles.mainContainer) }>
                    <div className={ cx(styles.container) }>
                        <Link className={ cx(styles.link) } to={ routes.DATABASE_CHOOSE }>
                            <button className={ cx(styles.btn) }>
                                Choose Database
                            </button>
                        </Link>

                        <div>
                            <LanguageSelector />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Intro;
