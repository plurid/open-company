import * as React from 'react';
import { Component } from 'react';
import HeaderTitle from './layout/HeaderTitle';

const styles = require('./DatabasePassword.scss');



export default class DatabasePassword extends Component {
    render() {
        return (
            <div style={ {height: '100%' } }>
                <HeaderTitle title="Database Password" />
                <div className={styles.mainContainer}>
                    <div className={styles.container}>
                        <h1>
                            Set Password for the Database
                        </h1>

                        <code>
                            /openinvoice.db
                        </code>

                        <div style={{ width: '100%'}}>
                            <h3>
                                Password
                            </h3>
                            <input className={styles.input} type="password" />
                        </div>

                        <div style={{ width: '100%'}}>
                            <h3>
                                Retype Password
                            </h3>
                            <input className={styles.input} type="password" />
                        </div>

                        <h2>
                            The password cannot be reset.
                            <br />Be careful. Use a password manager.
                        </h2>

                        <button className={styles.btn}>
                            Save Password
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
