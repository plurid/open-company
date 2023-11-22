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


    // return (
    //     <div class="flex h-full w-full flex-col">
    //         <div class="flex flex-1 gap-5 min-h-0">
    //             <aside class="flex w-1/6 items-center">
    //             <ul class="flex flex-col gap-10 overflow-auto bg-red-300 text-sm max-h-full">
    //                 <li>List Item 1</li>
    //                 <li>List Item 2</li>
    //                 <li>List Item 3</li>
    //                 <li>List Item 4</li>
    //                 <li>List Item 5</li>
    //                 <li>List Item 6</li>
    //                 <li>List Item 7</li>
    //                 <li>List Item 8</li>
    //                 <li>List Item 9</li>
    //                 <li>List Item 10</li>
    //                 <li>List Item 11</li>
    //                 <li>List Item 12</li>
    //                 <li>List Item 13</li>
    //                 <li>List Item 14</li>
    //                 <li>List Item 15</li>
    //                 <li>List Item 16</li>
    //                 <li>List Item 17</li>
    //                 <li>List Item 18</li>
    //                 <li>List Item 19</li>
    //                 <li>List Item 20</li>
    //             </ul>
    //             <div class="bg-red-600 p-2 text-xs">arrow to toggle sidebar</div>
    //             </aside>
    //             <main class="flex-1 overflow-hidden bg-blue-500">This is main</main>
    //         </div>
    //     </div>
    // );

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
