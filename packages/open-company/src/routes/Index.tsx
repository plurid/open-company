import { invoke } from '@tauri-apps/api';

import { onMount } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';

import './Index.css';

import {
    StringResponse,
    PureResponse,
    commands,
    routes,
    localStore,
} from '../data';

import {
    getFileNameFromPath,
} from '../utilities';



function App() {
    const navigate = useNavigate();

    const activeDatabase = localStorage.getItem(localStore.activeDatabase) || '';


    const logout = () => {
        localStorage.setItem(localStore.loggedIn, '');
    }

    onMount(async () => {
        const database = await invoke<StringResponse>(commands.check_database_exists);
        if (!database.status) {
            logout();
            localStorage.setItem(localStore.activeDatabase, '');
            navigate(routes.new_database);
            return;
        }
        localStorage.setItem(localStore.activeDatabase, database.data);

        const users = await invoke<PureResponse>(commands.check_users_exist);
        if (!users.status) {
            logout();
            navigate(routes.new_user);
            return;
        }

        const loggedIn = localStorage.getItem(localStore.loggedIn);
        if (!loggedIn) {
            logout();
            navigate(routes.login_user);
            return;
        }

        // check company owned by user exists
    });

    onMount(() => {
        const TIME_TO_LOAD_MS = 200;

        setTimeout(() => {
            invoke(commands.show_main_window);
        }, TIME_TO_LOAD_MS);
    });


    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <h1 class="text-3xl mb-12">open company</h1>

            <div class="flex flex-col gap-2">
                <A href="/new-database">change database ({getFileNameFromPath(activeDatabase)})</A>

                <div class="mb-4" />

                <A href="/users">users</A>
                <A href="/companies">companies</A>
                <A href="/contacts">contacts</A>
                <A href="/items">items</A>
                <A href="/contracts">contracts</A>
                <A href="/invoices">invoices</A>

                <div class="mb-4" />

                <A href="/new-user">new user</A>
                <A href="/new-company">new company</A>
                <A href="/new-invoice">new invoice</A>

                <button
                    class="mt-20"
                    onClick={() => {
                        logout();
                        navigate(routes.login_user);
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}


export default App;
