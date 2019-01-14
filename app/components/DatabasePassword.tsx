import * as React from 'react';
import { Component } from 'react';
import HeaderTitle from './layout/HeaderTitle';

const styles = require('./DatabasePassword.scss');

const Crypto = require('crypto-js')



type Props = {
    dbChoice: string;
    dbPath: string;
};

export default class DatabasePassword extends Component<Props, any> {
    constructor(props: Props) {
        super(props);

        this.state = {
            password: '',
            retype: '',
            similar: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    create() {
        return (
            <div style={ {height: '100%' } }>
                <HeaderTitle title="Database Password" />
                <div className={ styles.mainContainer }>
                    <div className={ `${styles.container} ${styles.containerCreate}` }>
                        <h1>
                            Set Password for the Database
                        </h1>

                        <code>
                            { this.props.dbPath }
                        </code>

                        <div style={{ width: '100%' }}>
                            <h3>
                                Password
                            </h3>
                            <input
                                className={ styles.input }
                                type="password"
                                name="password"
                                onChange={ this.handleChange }
                            />
                        </div>

                        <div style={ { width: '100%' } }>
                            <h3>
                                Retype Password
                            </h3>
                            <input
                                className={ styles.input }
                                type="password"
                                name="retype"
                                onChange={ this.handleChange }
                            />
                        </div>

                        <h2>
                            The password cannot be reset.
                            <br />Be careful. Use a password manager.
                        </h2>

                        <button onClick={ this.handleSave } className={ styles.btn }>
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
                <div className={ styles.mainContainer }>
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
                            <input
                                className={ styles.input }
                                type="password"
                                name="password"
                                onChange={ this.handleChange }
                            />
                        </div>

                        <button onClick={ this.handleSave } className={ styles.btn }>
                            Enter Password
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    handleChange = async (event) => {
        const value = event.target.name;

        this.setState({
            [value]: event.target.value
        });

        await this.checkSimilar();
    }

    handleSave = async () => {
        // console.log(this.state);
        await this.checkSimilar();

        if (this.props.dbChoice === 'selectDb') {
            await this.setDbPassword()
        }

        if (this.props.dbChoice === 'createDb') {
            if (this.state.similar) {
                await this.setDbPassword()
            }
        }
    }

    setDbPassword = async () => {
        const hash = Crypto.SHA512(this.state.password).toString()
        console.log(hash);

        await this.clearState();
        console.log(this.state);

        // dispatch hash to state
        // this.props.passwordHash(hash);

        // check password
        // this.props.checkPassword().then( () => {
             // redirect
        // }).catch( (err) => {
            // handle err
        // });
    }

    checkSimilar = async () => {
        if (this.state.password === this.state.retype
            && this.state.retype !== '')
        {
            this.setState({
                similar: true
            });
        } else {
            this.setState({
                similar: false
            });
        }
    }

    clearState = async () => {
        this.setState({
            password: '',
            retype: '',
            similar: false,
        });
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
