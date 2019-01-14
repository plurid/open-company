import * as React from 'react';
import { Component } from 'react';
// import { Link } from 'react-router-dom';
// const routes = require('../constants/routes.json');
import Header from './layout/Header';

const styles = require('./DatabaseChoose.scss');

const { dialog } = require('electron').remote;
import * as fs from 'fs';

import { history } from '../store/configureStore';



type Props = {
    dbChoice: (choice: string) => void;
    dbPath: (path: string) => void;
};

export default class DatabaseChoose extends Component<Props> {
    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const dbChoice: string = event.target.name;

        if (dbChoice === "createDb") {
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

                this.props.dbChoice(dbChoice);
                this.props.dbPath(fileName);

                history.push('/database-password');
            });
        }

        if (dbChoice === "selectDb") {
            dialog.showOpenDialog({properties: ['openFile']}, (filePaths) => {
                if (filePaths) {
                    const fileName = filePaths[0];
                    console.log(fileName);

                    fs.readFile(fileName, 'utf8', (err, data) => {
                        if (err) {
                            throw err;
                        }
                        console.log(data);
                    });

                    this.props.dbChoice(dbChoice);
                    this.props.dbPath(fileName);

                    history.push('/database-password');
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
                        <button
                            name="createDb"
                            onClick={this.handleClick}
                            className={styles.btn}
                        >
                            Create Database
                        </button>

                        <button
                            name="selectDb"
                            onClick={this.handleClick}
                            className={styles.btn}
                        >
                            Select Database
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
