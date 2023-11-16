import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import { createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';

import './Database.css';

import {
    PureResponse,
    commands,
    routes,
    localStore,
} from '../data';

import {
    getFileNameFromPath,
} from '../utilities';



function Database() {
    const [newDatabase, setNewDatabase] = createSignal('');
    const [loading, setLoading] = createSignal(false);

    const navigate = useNavigate();

    const loggedIn = !!localStorage.getItem(localStore.loggedIn);


    const startDatabase = async (
        name: string,
        location: string,
    ) => {
        const response = await invoke<PureResponse>(commands.start_database, {
            name,
            location,
        });
        if (!response.status) {
            localStorage.setItem(localStore.activeDatabase, '');
            return;
        }
        localStorage.setItem(localStore.activeDatabase, location);

        const users = await invoke<PureResponse>(commands.check_users_exist);
        if (!users.status) {
            navigate(routes.new_user);
            return;
        }

        navigate(routes.index);
    }

    const generateNewDatabase = async () => {
        if (!newDatabase()) {
            return;
        }

        setLoading(true);
        const directory = await open({
            directory: true,
            title: 'Select Database Directory',
        });
        setLoading(false);
        if (typeof directory !== 'string') {
            return;
        }

        await startDatabase(
            newDatabase(),
            directory + `/${newDatabase()}.sqlite`,
        );
    }

    const selectDatabase = async () => {
        setLoading(true);
        const file = await open({
            multiple: false,
            title: 'Open .sqlite Database',
            filters: [{
                extensions: ['sqlite'],
                name: 'sqlite',
            }],
        });
        setLoading(false);
        if (typeof file !== 'string') {
            return;
        }

        await startDatabase(
            getFileNameFromPath(file).replace('.sqlite', ''),
            file,
        );
    }


    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
            ${loading() ? 'opacity-40' : ''}
        `}>
            <h1>generate new database</h1>

            <input
                placeholder="database name"
                required
                value={newDatabase()}
                onInput={(event) => {
                    const value = event.currentTarget.value
                        .replace(/\s+/g, '');

                    setNewDatabase(value);
                }}
                onKeyPress={event => {
                    if (event.code === 'Space' || event.key === ' ') {
                        event.preventDefault();
                    }
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

            <h1 class="mb-2 mt-12">select existing database</h1>

            <button
                class="disabled:opacity-40 disabled:border-transparent disabled:pointer-events-none"
                onClick={() => {
                    selectDatabase();
                }}
            >
                Select Database
            </button>

            {loggedIn && (
                <A
                    href="/"
                    class="mt-12"
                >
                    back
                </A>
            )}
        </div>
    );
}


export default Database;
