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
                <A href={routes.new_database}>change database ({getFileNameFromPath(activeDatabase)})</A>

                <div class="mb-4" />

                <A href={routes.users}>users</A>
                <A href={routes.companies}>companies</A>
                <A href={routes.contacts}>contacts</A>
                <A href={routes.items}>items</A>
                <A href={routes.contracts}>contracts</A>
                <A href={routes.invoices}>invoices</A>

                <div class="mb-4" />

                <A href={routes.new_user}>new user</A>
                <A href={routes.new_company}>new company</A>
                <A href={routes.new_item}>new item</A>
                <A href={routes.new_invoice}>new invoice</A>

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
