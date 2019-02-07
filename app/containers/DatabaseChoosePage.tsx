import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import DatabaseChoose from '../components/pages/DatabaseChoose';
import DatabaseChooseActions from '../actions/databaseChoose';



export interface DatabaseChooseState {
    databaseChoose: {
        choice: string,
        path: string
    };
}

function mapStateToProps(state: DatabaseChooseState) {
    return {
        dbChoice: state.databaseChoose.choice,
        dbPath: state.databaseChoose.path
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators(DatabaseChooseActions, dispatch);
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DatabaseChoose);
