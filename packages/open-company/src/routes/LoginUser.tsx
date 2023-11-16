import { invoke } from '@tauri-apps/api/tauri';
import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import './LoginUser.css';

import {
    PureResponse,
    commands,
    routes,
    localStore,

    disabledButton,
} from '../data';



function LoginUser() {
    const [username, setUsername] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [error, setError] = createSignal(false);

    const navigate = useNavigate();


    const loginUser = async () => {
        setError(false);

        if (!username() || !password()) {
            setError(true);
            return;
        }

        const loggedIn = await invoke<PureResponse>(commands.login_user, {
            username: username(),
            password: password(),
        });
        if (!loggedIn.status) {
            localStorage.setItem(localStore.loggedIn, '');
            setError(true);
            return;
        }

        localStorage.setItem(localStore.loggedIn, username());
        navigate(routes.index);
    }


    return (
        <div class="p-8 flex flex-col items-center content-center">
            <h1 class="mb-8">login</h1>

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
                            loginUser();
                        }
                    }}
                />

                <button
                    class={`w-[300px] ${disabledButton}`}
                    disabled={!username() || !password()}
                    onClick={() => {
                        loginUser();
                    }}
                >
                    Login
                </button>

                {error() && (
                    <div>
                        invalid username or password
                    </div>
                )}
            </div>
        </div>
    );
}


export default LoginUser;
