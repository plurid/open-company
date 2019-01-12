import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
const routes = require('../constants/routes.json');
import Header from './layout/Header';

const styles = require('./Home.scss');

const { dialog } = require('electron').remote;
import * as fs from 'fs';



type Props = {};

export default class Home extends Component<Props> {
    props: Props;

    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
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
                <div className={styles.mainContainer}>
                    <div className={styles.container}>
                        <Link to={routes.DATABASE_CHOOSE}>
                            <button className={styles.btn}>
                                Choose Database
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
