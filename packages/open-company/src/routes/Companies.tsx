import { invoke } from '@tauri-apps/api/tauri';
import {
    onMount,
    createSignal,
    For,
    Show,
    Switch,
    Match,
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
    const [search, setSearch] = createSignal('');

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


    const companyRender = (
        company: any,
    ) => {
        const {
            id,
            name,
            use_for_invoicing,
        } = company;

        return (
            <Show
                when={!(
                    search()
                    && !name.toLowerCase().includes(search().toLowerCase())
                )}
                keyed
            >
                <div class="flex justify-between m-2">
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
            </Show>
        );
    }

    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <Switch>
                <Match when={companies().length === 0}>
                    <div>no companies</div>
                </Match>

                <Match when={companies().length > 0}>
                    <>
                        <h1>companies</h1>

                        <input
                            type="text"
                            placeholder="search"
                            value={search()}
                            onInput={(e) => {
                                setSearch(e.currentTarget.value);
                            }}
                        />

                        <div
                            class="h-[400px] max-h-[400px] overflow-y-auto"
                        >
                            <For each={companies()}>
                                {companyRender}
                            </For>
                        </div>
                    </>
                </Match>
            </Switch>

            <div class="grid gap-4 place-content-center justify-items-center w-[300px]">
                <BackHomeButton />
            </div>
        </div>
    );
}


export default Companies;
