import { invoke } from '@tauri-apps/api/tauri';
import {
    createSignal,
    onMount,
} from 'solid-js';
import {
    useNavigate,
} from '@solidjs/router';

import './Items.css';

import Selecter from '../components/Selecter';
import BackHomeButton from '../components/BackHomeButton';

import {
    localStore,
    commands,
    routes,
} from '../data';



function Items() {
    const [items, setItems] = createSignal<any[]>([]);

    const navigate = useNavigate();

    const loggedInUsername = localStorage.getItem(localStore.loggedIn);


    const editItem = (
        id: number,
    ) => {
        navigate(routes.edit_item.replace(':id', id + ''));
    }


    onMount(async () => {
        if (!loggedInUsername) {
            return;
        }

        const items = await invoke<any[]>(commands.get_items, {
            ownedBy: loggedInUsername,
        });
        setItems(items);
    });


    const itemRender = (
        item: any,
    ) => {
        const {
            id,
            name,
        } = item;

        return (
            <div class="flex justify-between m-2">
                <div>
                    {name}
                </div>

                <div
                    class="select-none cursor-pointer font-bold"
                    onClick={() => {
                        editItem(id);
                    }}
                >
                    edit
                </div>
            </div>
        );
    }

    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <h1>items</h1>

            <Selecter
                data={items()}
                renderItem={itemRender}
                height={50}
            />

            <BackHomeButton />
        </div>
    );
}


export default Items;
