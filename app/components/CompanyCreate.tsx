import * as React from 'react';
import { Component } from 'react';



type Props = {};

export default class CompanyCreate extends Component {
    constructor(props: Props) {
        super(props);

        this.handleCreate = this.handleCreate.bind(this);
    }

    handleCreate() {
        console.log('aa');
    }

    render() {
        return (
            <div>
                Create Company

                <button onClick={this.handleCreate}>Create Company</button>
            </div>
        );
    }
}
