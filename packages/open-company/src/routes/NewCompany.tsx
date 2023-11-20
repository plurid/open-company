import { invoke } from '@tauri-apps/api/tauri';
import {
    createSignal,
    For,
} from 'solid-js';
import { createStore } from "solid-js/store";
import { useNavigate } from '@solidjs/router';

import './NewCompany.css';

import {
    localStore,
    routes,
} from '../data';

import BackHomeButton from '../components/BackHomeButton';
import Toggle from '../components/Toggle';



export interface CompanyFields {
    template: string;
    data: CompanyField[];
}

export interface CompanyField {
    name: string;
    type: string;
    value: string | number | boolean;
    required: boolean;
}


function NewCompany() {
    const [companyName, setCompanyName] = createSignal('');
    const [companyTemplate, setCompanyTemplate] = createSignal('');
    const [companyFields, setCompanyFields] = createStore<CompanyField[]>([
        {
            name: 'id',
            type: 'string',
            value: '',
            required: true,
        },
        {
            name: 'address',
            type: 'string',
            value: '',
            required: true,
        },
    ]);
    // const [companyID, setCompanyID] = createSignal('');
    // const [companyAddress, setCompanyAddress] = createSignal('');
    // const [companyCountry, setCompanyCountry] = createSignal('');
    // const [companyContact, setCompanyContact] = createSignal('');
    const [useForInvoicing, setUseForInvoicing] = createSignal(false);

    const loggedInUsername = localStorage.getItem(localStore.loggedIn);

    const navigate = useNavigate();


    const generateCompany = async () => {
        await invoke('generate_new_company', {
            ownedBy: loggedInUsername,
            name: companyName(),
            fields: JSON.stringify({
                template: companyTemplate(),
                data: companyFields,
            }),
            // identification: companyID(),
            // address: companyAddress(),
            // country: companyCountry(),
            // contact: companyContact(),
            useForInvoicing: useForInvoicing(),
        });

        navigate(routes.index);
    }

    const updateField = (
        name: string,
        value: string,
    ) => {
        setCompanyFields(field => field.name === name, 'value', value);
    }


    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <h1>new company</h1>

            <input
                placeholder="name"
                required
                value={companyName()}
                onInput={(e) => setCompanyName(e.currentTarget.value)}
            />

            <For each={companyFields}>
                {(field) => {
                    const {
                        name,
                        value,
                    } = field;

                    return (
                        <input
                            placeholder={name}
                            required
                            value={value + ''}
                            onInput={(event) => {
                                updateField(
                                    name,
                                    event?.target.value,
                                );
                            }}
                        />
                    );
                }}
            </For>

            {/* <input
                placeholder="id"
                required
                value={companyID()}
                onInput={(e) => setCompanyID(e.currentTarget.value)}
            />

            <input
                placeholder="address"
                required
                value={companyAddress()}
                onInput={(e) => setCompanyAddress(e.currentTarget.value)}
            />

            <input
                placeholder="country"
                required
                value={companyCountry()}
                onInput={(e) => setCompanyCountry(e.currentTarget.value)}
            />

            <input
                placeholder="contact"
                required
                value={companyContact()}
                onInput={(e) => setCompanyContact(e.currentTarget.value)}
            /> */}

            <Toggle
                text="use for invoicing"
                value={useForInvoicing()}
                toggle={() => {
                    setUseForInvoicing(!useForInvoicing());
                }}
            />

            <button
                onClick={() => {
                    generateCompany();
                }}
            >
                Generate Company
            </button>

            <BackHomeButton />
        </div>
    );
}


export default NewCompany;
