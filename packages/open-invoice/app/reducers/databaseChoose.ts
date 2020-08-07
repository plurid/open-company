import { DatabaseChooseTypeKeys, DatabaseChooseTypes } from '../actions/databaseChoose';



export default function databaseChoose(state = {}, action: DatabaseChooseTypes) {
    switch (action.type) {
        case DatabaseChooseTypeKeys.DB_CHOICE:
            return {
                ...state,
                choice: action.choice
            }
        case DatabaseChooseTypeKeys.DB_PATH:
            return {
                ...state,
                path: action.path
            }
        default:
            return state;
    }
}
