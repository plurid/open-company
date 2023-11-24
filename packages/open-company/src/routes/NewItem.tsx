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
    const [display, setDisplay] = createSignal('');
    const [currency, setCurrency] = createSignal('');
    const [defaultQuantity, setDefaultQuantity] = createSignal(1);
    const [price, setPrice] = createSignal(0);

    const navigate = useNavigate();
    const params = useParams();

    const loggedInUsername = localStorage.getItem(localStore.loggedIn);


    const collectItem = () => {
        return {
            ownedBy: loggedInUsername,
            name: name(),
            display: display(),
            currency: currency(),
            defaultQuantity: defaultQuantity(),
            price: price(),
        };
    }

    const generateItem = async () => {
        if (!name() || !price()) {
            return;
        }

        if (!loggedInUsername) {
            return;
        }

        await invoke(commands.generate_new_item, {
            ...collectItem(),
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
            id: parseInt(params.id),
            ...collectItem(),
        });

        navigate(routes.items);
    }


    onMount(async () => {
        if (!params.id) {
            return;
        }

        const item = await invoke<any>(commands.get_item, {
            ownedBy: loggedInUsername,
            id: parseInt(params.id),
        });
        if (!item) {
            return;
        }

        setName(item.name);
        setDisplay(item.display);
        setCurrency(item.currency);
        setDefaultQuantity(item.defaultQuantity);
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
                placeholder="display"
                required
                value={display()}
                onInput={(e) => setDisplay(e.currentTarget.value)}
            />

            <input
                class="w-[300px]"
                placeholder="currency"
                required
                value={currency()}
                onInput={(e) => setCurrency(e.currentTarget.value)}
            />

            <input
                class="w-[300px]"
                placeholder="price"
                required
                type="number"
                value={price()}
                onInput={(e) => {
                    const value = parseFloat(e.currentTarget.value);
                    if (isNaN(value) || value < 0) {
                        e.currentTarget.value = price() + '';
                        return;
                    }

                    setPrice(value);
                }}
            />

            <input
                class="w-[300px]"
                placeholder="default quantity"
                required
                type="number"
                value={defaultQuantity()}
                onInput={(e) => {
                    const value = parseFloat(e.currentTarget.value);
                    if (isNaN(value) || value < 0) {
                        e.currentTarget.value = defaultQuantity() + '';
                        return;
                    }

                    setDefaultQuantity(value);
                }}
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
