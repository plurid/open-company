import { invoke } from '@tauri-apps/api/tauri';
import {
    createSignal,
    onMount,
    For,
    Show,
} from 'solid-js';

import './NewInvoice.css';

import Selecter from '../components/Selecter';
import BackHomeButton from '../components/BackHomeButton';

import {
    localStore,
    commands,
} from '../data';



function NewInvoice() {
    const [companies, setCompanies] = createSignal<any[]>([]);
    const [items, setItems] = createSignal<any[]>([]);
    const [invoicingCompany, setInvoicingCompany] = createSignal<any>(null);
    const [invoiceeCompany, setInvoiceeCompany] = createSignal<any>(null);
    const [invoicingItems, setInvoicingItems] = createSignal<any[]>([]);

    const loggedInUsername = localStorage.getItem(localStore.loggedIn);


    const saveInvoice = () => {

    };


    onMount(async () => {
        if (!loggedInUsername) {
            return;
        }

        const companies = await invoke<any[]>(commands.get_companies, {
            ownedBy: loggedInUsername,
        });
        setCompanies(companies);

        // const items = await invoke<any[]>(commands.get_items, {
        //     ownedBy: loggedInUsername,
        // });
        // setItems(items);
    });


    return (
        <div class={`
            p-8 w-[400px] mx-auto
            grid gap-4
        `}>
            <h1>new invoice</h1>

            <Show when={companies().length > 0}>
                <div>
                    <div
                        class="mb-2"
                    >
                        select invoicing company
                    </div>

                    <Selecter
                        data={companies()}
                        renderItem={(company) => {
                            return (
                                <Show when={company.use_for_invoicing}>
                                    <div
                                        class="select-none cursor-pointer font-bold"
                                        onClick={() => {
                                            setInvoicingCompany(company);
                                        }}
                                    >
                                        {company.name}
                                    </div>
                                </Show>
                            );
                        }}
                        height={50}
                    />
                </div>

                <div>
                    <div
                        class="mb-2"
                    >
                        select invoicee company
                    </div>

                    <Selecter
                        data={companies()}
                        renderItem={(company) => {
                            return (
                                <Show when={
                                    invoicingCompany() ? invoicingCompany().name !== company.name : true
                                }>
                                    <div
                                        class="select-none cursor-pointer font-bold"
                                        onClick={() => {
                                            setInvoiceeCompany(company);
                                        }}
                                    >
                                        {company.name}
                                    </div>
                                </Show>
                            );
                        }}
                        height={50}
                    />
                </div>
            </Show>


            <Show when={items().length > 0}>
                <div>
                    select items
                </div>

                <Selecter
                    data={items()}
                    renderItem={(item) => {
                        return (
                            <div
                                class="select-none cursor-pointer font-bold"
                                onClick={() => {
                                    setInvoicingItems([
                                        ...invoicingItems(),
                                        item,
                                    ]);
                                }}
                            >
                                {item.name}
                            </div>
                        );
                    }}
                    height={50}
                />
            </Show>

            <div>
                <Show when={invoicingCompany()}>
                    <div>
                        {invoicingCompany().name}
                    </div>
                </Show>

                <Show when={invoiceeCompany()}>
                    <div>
                        {invoiceeCompany().name}
                    </div>
                </Show>
            </div>

            <For each={invoicingItems()}>
                {(item, i) =>
                    <li>
                        {i() + 1}: {item}
                    </li>
                }
            </For>


            <button
                class="h-[50px]"
                onClick={() => {
                    saveInvoice();
                }}
            >
                Save Invoice
            </button>

            <BackHomeButton />
        </div>
    );
}


export default NewInvoice;
