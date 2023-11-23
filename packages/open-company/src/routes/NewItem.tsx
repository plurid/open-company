import { invoke } from '@tauri-apps/api/tauri';
import {
    createSignal,
} from 'solid-js';
import {
    useNavigate,
    useParams,
} from '@solidjs/router';

import BackHomeButton from '../components/BackHomeButton';

import {
    localStore,
    commands,
    routes,
} from '../data';



function NewItem() {
    const [name, setName] = createSignal('');
    const [price, setPrice] = createSignal(0);

    const navigate = useNavigate();
    const params = useParams();

    const loggedInUsername = localStorage.getItem(localStore.loggedIn);


    const generateItem = async () => {
        if (!name() || !price()) {
            return;
        }

        if (!loggedInUsername) {
            return;
        }

        await invoke(commands.generate_new_item, {
            ownedBy: loggedInUsername,
            name: name(),
            price: price(),
        });

        navigate(routes.index);
    }


    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <h1>new item</h1>

            <input
                class="w-[300px]"
                placeholder="name"
                required
                value={name()}
                onInput={(e) => setName(e.currentTarget.value)}
            />

            <input
                class="w-[300px]"
                placeholder="price"
                required
                value={price()}
                onInput={(e) => setPrice(
                    parseFloat(e.currentTarget.value),
                )}
            />

            <button
                class="h-[50px]"
                onClick={() => {
                    generateItem();
                }}
            >
                Generate Item
            </button>

            <BackHomeButton />
        </div>
    );
}


export default NewItem;
