import { invoke } from '@tauri-apps/api';

import { onMount } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';

import './Index.css';

import {
    StringResponse,
    PureResponse,
    commands,
    routes,
} from '../data';



function App() {
    const navigate = useNavigate();

    onMount(async () => {
        const database = await invoke<StringResponse>(commands.check_database_exists);
        if (!database.status) {
            navigate(routes.new_database);
            return;
        }

        const users = await invoke<PureResponse>(commands.check_users_exist);
        if (!users.status) {
            navigate(routes.new_user);
            return;
        }
    });

    onMount(() => {
        const TIME_TO_LOAD_MS = 300;

        setTimeout(() => {
            invoke(commands.show_main_window);
        }, TIME_TO_LOAD_MS);
    });


    return (
        <div class="container"
        >
            <h1>open company</h1>

            <div class="flex flex-col gap-2">
                <A href="/new-database">database</A>
                <A href="/new-user">new user</A>
                <A href="/new-company">new company</A>
                <A href="/new-invoice">new invoice</A>
            </div>
        </div>
    );
}


export default App;
