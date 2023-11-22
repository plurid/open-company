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
import Dropdown from '../components/Dropdown';



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
    const [view, setView] = createSignal<'new-company' | 'new-company-template'>('new-company');

    const [companyTemplateName, setCompanyTemplateName] = createSignal('');
    const [companyTemplateDefault, setCompanyTemplateDefault] = createSignal(false);
    const [companyTemplateFields, setCompanyTemplateFields] = createStore<CompanyField[]>([]);

    const [companyTemplates, setCompanyTemplates] = createSignal<any[]>([]);
    const [companyTemplate, setCompanyTemplate] = createSignal('');
    const [companyName, setCompanyName] = createSignal('');
    const [companyFields, setCompanyFields] = createStore<CompanyField[]>([]);
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
    }

    const updateTemplateField = (
        idx: number,
        value: string,
    ) => {
        setCompanyTemplateFields(idx, 'name', value);
    }

    const generateNewCompanyTemplate = async () => {
        const template = await invoke<any>(commands.generate_new_company_template, {
            ownedBy: loggedInUsername,
            name: companyTemplateName(),
            fields: JSON.stringify(companyTemplateFields),
            asDefault: companyTemplateDefault(),
        });
        if (!template) {
            return;
        }

        setCompanyTemplate(template.name);
        setCompanyFields(JSON.parse(template.fields));
        setView('new-company');
    }


    onMount(async () => {
        const templates = await invoke<any[]>(commands.get_company_templates, {
            ownedBy: loggedInUsername,
        }) || [];
        setCompanyTemplates(templates);
        const defaultTemplate = templates.find(template => template.as_default) || templates[0];
        if (!defaultTemplate) {
            setView('new-company-template');
            return;
        }

        setCompanyTemplate(defaultTemplate.name);
        setCompanyFields(JSON.parse(defaultTemplate.fields));
    });


    const newCompanyTemplate = (
        <>
            <input
                class="mb-8"
                placeholder={"template name"}
                required
                value={companyTemplateName()}
                onInput={(event) => {
                    setCompanyTemplateName(event?.target.value);
                }}
            />

            <For each={companyTemplateFields}>
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
                                        setCompanyTemplateFields(
                                            companyTemplateFields.filter((_, i) => i !== idx()),
                                        );
                                    }}
                                >
                                    &#10005;
                                </div>
                            </div>

                            <input
                                placeholder={"field name"}
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

            <Toggle
                text="default template"
                value={companyTemplateDefault()}
                toggle={() => {
                    setCompanyTemplateDefault(!companyTemplateDefault());
                }}
            />

            <button
                class="mt-8"
                onClick={() => {
                    generateNewCompanyTemplate();
                }}
            >
                Generate Company Template
            </button>

            <BackHomeButton
                atClick={() => {
                    setView('new-company');
                }}
            />
        </>
    );

    const newCompany = (
        <>
            <h1>new company</h1>

            <div
                class="my-8"
            >
                <div
                    class="mb-4 flex items-center justify-center"
                >
                    <div>
                        using template
                    </div>

                    <Dropdown
                        selected={companyTemplate}
                        select={(selection) => {
                            const template = companyTemplates().find(template => template.name === selection);
                            if (!template) {
                                return;
                            }
                            setCompanyTemplate(template.name);
                            setCompanyFields(JSON.parse(template.fields));
                        }}
                        selectables={() => companyTemplates().map(template => template.name)}
                    />
                </div>

                <button
                    class="w-[280px]"
                    onClick={() => {
                        setView('new-company-template');
                    }}
                >
                    New Company Template
                </button>
            </div>

            <input
                class="mb-4"
                placeholder="company name"
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
        </>
    );

    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            {view() === 'new-company-template' && (
                <>{newCompanyTemplate}</>
            )}

            {view() === 'new-company' && (
                <>{newCompany}</>
            )}
        </div>
    );
}


export default NewCompany;
