import { invoke } from '@tauri-apps/api/tauri';
import {
    createSignal,
    onMount,
    Switch,
    Match,
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

    const editItem = async () => {
        if (!name() || !price()) {
            return;
        }

        if (!loggedInUsername) {
            return;
        }

        await invoke(commands.update_item, {
            ownedBy: loggedInUsername,
            id: params.id,
            name: name(),
            price: price(),
        });

        navigate(routes.index);
    }


    onMount(async () => {
        if (!params.id) {
            return;
        }

        const item = await invoke<any>(commands.get_item, {
            ownedBy: loggedInUsername,
            id: params.id,
        });
        if (!item) {
            return;
        }

        setName(item.name);
        setPrice(item.price);
    });


    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <Switch>
                <Match when={params.id}>
                    <h1>edit item</h1>
                </Match>
                <Match when={!params.id}>
                    <h1>new item</h1>
                </Match>
            </Switch>

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

            <Switch>
                <Match when={params.id}>
                    <button
                        class="h-[50px]"
                        onClick={() => {
                            editItem();
                        }}
                    >
                        Edit Item
                    </button>
                </Match>
                <Match when={!params.id}>
                    <button
                        class="h-[50px]"
                        onClick={() => {
                            generateItem();
                        }}
                    >
                        Generate Item
                    </button>
                </Match>
            </Switch>

            <BackHomeButton />
        </div>
    );
}


export default NewItem;
