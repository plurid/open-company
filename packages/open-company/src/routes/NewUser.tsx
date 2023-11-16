import { invoke } from '@tauri-apps/api/tauri';
import { createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';

import './NewUser.css';

import {
    PureResponse,
    commands,
    routes,
    localStore,

    disabledButton,
} from '../data';



function NewUser() {
    const [username, setUsername] = createSignal('');
    const [password, setPassword] = createSignal('');

    const navigate = useNavigate();

    const loggedIn = !!localStorage.getItem(localStore.loggedIn);


    const generateUser = async () => {
        if (!username() || !password()) {
            return;
        }

        const generatedUser = await invoke<PureResponse>(commands.generate_new_user, {
            username: username(),
            password: password(),
        });
        if (!generatedUser) {
            return;
        }

        localStorage.setItem(localStore.loggedIn, username());
        navigate(routes.index);
    }


    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <h1>new user</h1>

            <div class="grid gap-4 place-content-center justify-items-center w-[300px]">
                <input
                    class="w-[300px]"
                    placeholder="username"
                    required
                    value={username()}
                    onInput={(e) => setUsername(e.currentTarget.value)}
                />

                <input
                    class="w-[300px]"
                    placeholder="password"
                    required
                    value={password()}
                    type="password"
                    onInput={(e) => setPassword(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            generateUser();
                        }
                    }}
                />

                <button
                    class={`w-[300px] ${disabledButton}`}
                    disabled={!username() || !password()}
                    onClick={() => {
                        generateUser();
                    }}
                >
                    Generate User
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
        </div>
    );
}


export default NewUser;
