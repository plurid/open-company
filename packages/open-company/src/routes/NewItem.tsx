import { invoke } from '@tauri-apps/api/tauri';
import {
    createSignal,
    onMount,
    For,
    Switch,
    Match,
} from 'solid-js';
import { createStore } from "solid-js/store";
import {
    useNavigate,
    useParams,
} from '@solidjs/router';

import BackHomeButton from '../components/BackHomeButton';
import Toggle from '../components/Toggle';
import InputTitle from '../components/InputTitle';

import {
    localStore,
    commands,
    routes,
} from '../data';



export interface ItemFields {
    template: string;
    data: ItemField[];
}

export interface ItemField {
    name: string;
    type: string;
    value: string | number | boolean;
    required: boolean;
}


function NewItem() {
    const [view, setView] = createSignal<
        | ''
        | 'new-item-template'
        | 'new-item'
    >('new-item');

    const [itemTemplateName, setItemTemplateName] = createSignal('');
    const [itemTemplateDefault, setItemTemplateDefault] = createSignal(false);
    const [itemTemplateFields, setItemTemplateFields] = createStore<ItemField[]>([]);

    const [itemTemplates, setItemTemplates] = createSignal<any[]>([]);
    const [itemTemplate, setItemTemplate] = createSignal('');
    const [itemFields, setItemFields] = createStore<ItemField[]>([]);

    const [editingItem, setEditingItem] = createSignal<any>(undefined);

    const [name, setName] = createSignal('');
    const [display, setDisplay] = createSignal('');
    const [unit, setUnit] = createSignal('');
    const [defaultQuantity, setDefaultQuantity] = createSignal(1);
    const [currency, setCurrency] = createSignal('');
    const [price, setPrice] = createSignal(0);

    const loggedInUsername = localStorage.getItem(localStore.loggedIn);

    const navigate = useNavigate();
    const params = useParams();



    const newTemplateField = () => {
        setItemTemplateFields([
            ...itemTemplateFields,
            {
                name: '',
                type: 'text',
                value: '',
                required: true,
            },
        ]);
    }

    const updateTemplateField = (
        idx: number,
        value: string,
    ) => {
        setItemTemplateFields(idx, 'name', value);
    }


    const generateNewItemTemplate = () => {

    }


    const collectItem = () => {
        return {
            ownedBy: loggedInUsername,
            name: name(),
            display: display(),
            unit: unit(),
            defaultQuantity: defaultQuantity(),
            currency: currency(),
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


    const matchFallback = (
        <>
            <div>
                something went wrong
            </div>

            <BackHomeButton />
        </>
    );

    const newItemTemplate = (
        <>
            <input
                class="mb-8"
                placeholder={"template name"}
                required
                value={itemTemplateName()}
                onInput={(event) => {
                    setItemTemplateName(event?.target.value);
                }}
                spellcheck={false}
            />

            <For each={itemTemplateFields}>
                {(field, idx) => {
                    const {
                        name,
                    } = field;

                    return (
                        <div class="mb-6">
                            <div class="flex justify-between">
                                <div class="text-left mb-2">
                                    field {idx()}
                                </div>

                                <div
                                    class="select-none cursor-pointer"
                                    onClick={() => {
                                        setItemTemplateFields(
                                            itemTemplateFields.filter((_, i) => i !== idx()),
                                        );
                                    }}
                                >
                                    &#10005;
                                </div>
                            </div>

                            <input
                                class="w-full"
                                placeholder={"field name"}
                                required
                                value={name + ''}
                                onInput={(event) => {
                                    updateTemplateField(idx(), event?.target.value);
                                }}
                                spellcheck={false}
                            />
                        </div>
                    );
                }}
            </For>

            <button
                onClick={() => {
                    newTemplateField();
                }}
            >
                Add Template Field
            </button>

            <Toggle
                text="default template"
                value={itemTemplateDefault()}
                toggle={() => {
                    setItemTemplateDefault(!itemTemplateDefault());
                }}
            />

            <button
                class="mt-8 disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => {
                    generateNewItemTemplate();
                }}
                disabled={!itemTemplateName() || itemTemplateFields.length === 0}
            >
                Generate Item Template
            </button>

            {itemTemplate() ? (
                <BackHomeButton
                    atClick={() => {
                        setView('new-item');
                    }}
                />
            ) : (
                <BackHomeButton />
            )}
        </>
    );

    const newItem = (
        <>
            <Switch>
                <Match when={params.id}>
                    <h1>edit item</h1>
                </Match>
                <Match when={!params.id}>
                    <h1>new item</h1>
                </Match>
            </Switch>

            <InputTitle
                title="name"
                value={name}
                atInput={(value) => setName(value)}
                placeholder="name"
                class="w-[300px]"
                required
            />

            <InputTitle
                title="display"
                value={display}
                atInput={(value) => setDisplay(value)}
                placeholder="display"
                class="w-[300px]"
                required
            />

            <InputTitle
                title="unit"
                value={unit}
                atInput={(value) => setUnit(value)}
                placeholder="unit"
                class="w-[300px]"
                required
            />

            <InputTitle
                title="default quantity"
                value={defaultQuantity}
                atInput={() => {}}
                onInput={(e) => {
                    const value = parseFloat(e.currentTarget.value);
                    if (isNaN(value) || value < 0) {
                        e.currentTarget.value = defaultQuantity() + '';
                        return;
                    }

                    setDefaultQuantity(value);
                }}
                type="number"
                placeholder="default quantity"
                class="w-[300px]"
                required
            />

            <InputTitle
                title="currency"
                value={currency}
                atInput={(value) => setCurrency(value)}
                placeholder="currency"
                class="w-[300px]"
                required
            />

            <InputTitle
                title="price"
                value={price}
                atInput={() => {}}
                onInput={(e) => {
                    const value = parseFloat(e.currentTarget.value);
                    if (isNaN(value) || value < 0) {
                        e.currentTarget.value = price() + '';
                        return;
                    }

                    setPrice(value);
                }}
                type="number"
                placeholder="price"
                class="w-[300px]"
                required
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
        </>
    );


    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
             <Switch
                fallback={matchFallback}
            >
                <Match when={view() === 'new-item-template'}>
                    {newItemTemplate}
                </Match>
                <Match when={view() === 'new-item'}>
                    {newItem}
                </Match>
            </Switch>
        </div>
    );
}


export default NewItem;
