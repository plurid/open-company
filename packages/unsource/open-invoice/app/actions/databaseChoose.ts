export enum DatabaseChooseTypeKeys {
    DB_CHOICE = 'DB_CHOICE',
    DB_PATH = 'DB_PATH',
}

interface DbChoiceAction {
    type: DatabaseChooseTypeKeys.DB_CHOICE;
    choice: string;
}

interface DbPathAction {
    type: DatabaseChooseTypeKeys.DB_PATH;
    path: string;
}

export type DatabaseChooseTypes = DbChoiceAction | DbPathAction;

export function dbChoice(choice: string) {
    return {
        type: DatabaseChooseTypeKeys.DB_CHOICE,
        choice
    };
}

export function dbPath(path: string) {
    return {
        type: DatabaseChooseTypeKeys.DB_PATH,
        path
    }
}


export default { dbChoice, dbPath };
