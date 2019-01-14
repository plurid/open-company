import * as React from 'react';
import { Component } from 'react';
import HeaderTitle from './layout/HeaderTitle';

const styles = require('./DatabasePassword.scss');



type Props = {
    dbChoice: string;
    dbPath: string
};

export default class DatabasePassword extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    create() {
        return (
            <div style={ {height: '100%' } }>
                <HeaderTitle title="Database Password" />
                <div className={styles.mainContainer}>
                    <div className={ `${styles.container} ${styles.containerCreate}` }>
                        <h1>
                            Set Password for the Database
                        </h1>

                        <code>
                            { this.props.dbPath }
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

    select() {
        return (
            <div style={ {height: '100%' } }>
                <HeaderTitle title="Database Password" />
                <div className={styles.mainContainer}>
                    <div className={ `${styles.container} ${styles.containerSelect}` }>
                        <h1>
                            Enter Password for the Database
                        </h1>

                        <code>
                            { this.props.dbPath }
                        </code>

                        <div style={{ width: '100%'}}>
                            <h3>
                                Password
                            </h3>
                            <input className={styles.input} type="password" />
                        </div>

                        <button className={styles.btn}>
                            Enter Password
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                { this.props.dbChoice === 'createDb'
                    ? this.create()
                    : this.props.dbChoice === 'selectDb'
                        ? this.select()
                        : ''
                }
            </React.Fragment>
        );
    }
}
