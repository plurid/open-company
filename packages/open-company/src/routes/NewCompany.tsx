import { invoke } from '@tauri-apps/api/tauri';
import {
    createSignal,
    For,
    onMount,
} from 'solid-js';
import { createStore } from "solid-js/store";
import { useNavigate } from '@solidjs/router';

import './NewCompany.css';

import {
    localStore,
    routes,
    commands,
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
    const [companyTemplateFields, setCompanyTemplateFields] = createStore<CompanyField[]>([]);
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
        {
            name: 'contact',
            type: 'string',
            value: '',
            required: true,
        },
        {
            name: 'country',
            type: 'string',
            value: '',
            required: true,
        },
    ]);
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


    const newTemplateField = () => {
        setCompanyTemplateFields([
            ...companyTemplateFields,
            {
                name: '',
                type: 'text',
                value: '',
                required: true,
            },
        ]);

        console.log('companyTemplateFields', companyTemplateFields);
    }

    const updateTemplateField = (
        idx: number,
        value: string,
    ) => {
        setCompanyTemplateFields(idx, 'name', value);
    }

    const generateNewCompanyTemplate = async () => {
        await invoke<any[]>(commands.generate_new_company_template, {
            ownedBy: loggedInUsername,
            fields: companyTemplateFields,
        });
    }


    onMount(async () => {
        const templates = await invoke<any[]>(commands.get_company_templates, {
            ownedBy: loggedInUsername,
        });
    });


    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <For each={companyTemplateFields}>
                {(field, idx) => {
                    const {
                        name,
                    } = field;

                    return (
                        <div>
                            <input
                                placeholder={"name"}
                                required
                                value={name + ''}
                                onInput={(event) => {
                                    updateTemplateField(idx(), event?.target.value);
                                }}
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

            <button
                onClick={() => {
                    generateNewCompanyTemplate();
                }}
            >
                New Company Template
            </button>

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
