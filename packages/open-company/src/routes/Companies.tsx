import { invoke } from '@tauri-apps/api/tauri';
import {
    onMount,
    createSignal,
    For,
} from 'solid-js';
import { useNavigate } from '@solidjs/router';

import './Companies.css';

import BackHomeButton from '../components/BackHomeButton';

import {
    localStore,
    commands,
    routes,
} from '../data';



function Companies() {
    const [companies, setCompanies] = createSignal<any[]>([]);

    const navigate = useNavigate();

    const loggedInUsername = localStorage.getItem(localStore.loggedIn);


    const editCompany = (
        id: string,
    ) => {
        navigate(routes.edit_company.replace(':id', id));
    }


    onMount(async () => {
        if (!loggedInUsername) {
            return;
        }

        const companies = await invoke<any[]>(commands.get_companies, {
            ownedBy: loggedInUsername,
        });
        setCompanies(companies);
    });


    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <h1>companies</h1>

            <For each={companies()}>
                {(company) => {
                    const {
                        id,
                        name,
                        use_for_invoicing,
                    } = company;

                    return (
                        <div class="flex justify-between">
                            <div>
                                {name} {use_for_invoicing ? '(invoicing)' : ''}
                            </div>

                            <div
                                class="select-none cursor-pointer font-bold"
                                onClick={() => {
                                    editCompany(id);
                                }}
                            >
                                edit
                            </div>
                        </div>
                    );
                }}
            </For>

            <div class="grid gap-4 place-content-center justify-items-center w-[300px]">
                <BackHomeButton />
            </div>
        </div>
    );
}


export default Companies;
