import { invoke } from '@tauri-apps/api/tauri';
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
                    onInput={(e) => setNewDatabase(e.currentTarget.value)}
                />

                <button
                    onClick={() => {
                        invoke('start_database', {
                            name: newDatabase,
                            location: '/foo',
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
