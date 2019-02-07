import { connect } from 'react-redux';

import DatabasePassword from '../components/pages/DatabasePassword';



export interface DatabasePasswordState {
    databaseChoose: {
        choice: string,
        path: string
    };
}

function mapStateToProps(state: DatabasePasswordState) {
    return {
        dbChoice: state.databaseChoose.choice,
        dbPath: state.databaseChoose.path
    };
}


export default connect(
    mapStateToProps,
)(DatabasePassword);
