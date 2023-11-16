import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import { createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';

import './Database.css';

import {
    PureResponse,
    commands,
    routes,
} from '../data';



function Database() {
    const [newDatabase, setNewDatabase] = createSignal('');

    const navigate = useNavigate();


    const generateNewDatabase = async () => {
        if (!newDatabase()) {
            return;
        }

        const directory = await open({
            directory: true,
        });
        if (typeof directory !== 'string') {
            return;
        }

        const response = await invoke<PureResponse>(commands.start_database, {
            name: newDatabase(),
            location: directory + `/${newDatabase()}.sqlite`,
        });
        if (!response.status) {
            return;
        }

        const users = await invoke<PureResponse>(commands.check_users_exist);
        if (!users.status) {
            navigate(routes.new_user);
            return;
        }

        navigate(routes.index);
    }


    return (
        <div class="container">
            <h1>database</h1>

            <div class="flex gap-2 items-center">
                <input
                    placeholder="database name"
                    required
                    value={newDatabase()}
                    onInput={(event) => {
                        const value = event.currentTarget.value
                            .replace(/\s+/g, '')
                            .trim();

                        setNewDatabase(value);
                    }}
                    spellcheck={false}
                    autocapitalize="off"
                    autocorrect="off"
                    autocomplete="false"
                />

                <button
                    class="disabled:opacity-40 disabled:border-transparent disabled:pointer-events-none"
                    disabled={!newDatabase()}
                    onClick={() => {
                        generateNewDatabase();
                    }}
                >
                    Generate Database
                </button>

                <A href="/">back</A>
            </div>
        </div>
    );
}


export default Database;
