import { invoke } from '@tauri-apps/api/tauri';
import { createSignal } from 'solid-js';
import { A, useNavigate } from '@solidjs/router';

import './NewUser.css';

import {
    PureResponse,
    commands,
    routes,

    disabledButton,
} from '../data';



function NewUser() {
    const [username, setUsername] = createSignal('');
    const [password, setPassword] = createSignal('');

    const navigate = useNavigate();


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

        navigate(routes.index);
    }


    return (
        <div class="p-8 flex flex-col items-center content-center">
            <h1 class="mb-8">new user</h1>

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

                <A href="/">back</A>
            </div>
        </div>
    );
}


export default NewUser;
