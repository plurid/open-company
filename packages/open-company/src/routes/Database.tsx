import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/dialog';
import { createSignal } from 'solid-js';
import { A } from '@solidjs/router';

import './Database.css';



function Database() {
    const [newDatabase, setNewDatabase] = createSignal('');


    return (
        <div class="container">
            <h1>database</h1>

            <div class="flex gap-2 items-center">
                <input
                    placeholder="database name"
                    required
                    value={newDatabase()}
                    onInput={(e) => {
                        setNewDatabase(
                            e.currentTarget.value
                                .replace(/\s+/g, '')
                                .trim()
                        );
                    }}
                />

                <button
                    onClick={async () => {
                        if (!newDatabase()) {
                            return;
                        }

                        const directory = await open({
                            directory: true,
                        });

                        invoke('start_database', {
                            name: newDatabase(),
                            location: directory + `/${newDatabase()}.sqlite`,
                        });
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
