import { invoke } from '@tauri-apps/api/tauri';
import {
    createSignal,
    onMount,
    For,
} from 'solid-js';

import './Users.css';

import {
    commands,
    localStore,
} from '../data';

import BackHomeButton from '../components/BackHomeButton';



function Users() {
    const [users, setUsers] = createSignal([]);

    const loggedInUsername = localStorage.getItem(localStore.loggedIn);

    const loadUsers = async () => {
        const users = await invoke<any>(commands.get_users);
        setUsers(users);
    }

    onMount(() => {
        loadUsers();
    });

    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <h1>users</h1>

            <For each={users()}>
                {(user: any) =>
                    <li
                        class={`
                            ${
                                loggedInUsername === user.username
                                    ? 'text-blue-500 font-bold'
                                    : ''
                            } list-none
                        `}
                    >
                        {user.username}
                    </li>
                }
            </For>

            <div class="grid gap-4 place-content-center justify-items-center w-[300px]">

                <BackHomeButton />
            </div>
        </div>
    );
}


export default Users;
