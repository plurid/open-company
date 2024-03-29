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

import './NewCompany.css';

import {
    PureResponse,

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
    const [view, setView] = createSignal<
        | ''
        | 'new-company'
        | 'new-company-template'
        | 'edit-templates'
        | 'delete-company'
    >('new-company');

    const [companyTemplateName, setCompanyTemplateName] = createSignal('');
    const [companyTemplateDefault, setCompanyTemplateDefault] = createSignal(false);
    const [companyTemplateFields, setCompanyTemplateFields] = createStore<CompanyField[]>([]);

    const [companyTemplates, setCompanyTemplates] = createSignal<any[]>([]);
    const [companyTemplate, setCompanyTemplate] = createSignal('');
    const [companyName, setCompanyName] = createSignal('');
    const [companyFields, setCompanyFields] = createStore<CompanyField[]>([]);
    const [useForInvoicing, setUseForInvoicing] = createSignal(false);

    const [editingCompany, setEditingCompany] = createSignal<any>(undefined);

    const loggedInUsername = localStorage.getItem(localStore.loggedIn);

    const navigate = useNavigate();
    const params = useParams();

    const generateCompany = async () => {
        await invoke(commands.generate_new_company, {
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


    const resetTemplateData = () => {
        setCompanyTemplateName('');
        setCompanyTemplateDefault(false);
        setCompanyTemplateFields([]);
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

    const invalidNewCompanyTemplate = () => {
        return !companyTemplateName() || companyTemplateFields.length === 0;
    }

    const generateNewCompanyTemplate = async () => {
        if (invalidNewCompanyTemplate()) {
            return;
        }

        const template = await invoke<any>(commands.generate_new_company_template, {
            ownedBy: loggedInUsername,
            name: companyTemplateName(),
            fields: JSON.stringify(companyTemplateFields),
            asDefault: companyTemplateDefault(),
        });
        setCompanyTemplates((prevTemplates) => [...prevTemplates, template]);
        if (!template) {
            return;
        }

        setCompanyTemplate(template.name);
        setCompanyFields(JSON.parse(template.fields));
        setView('new-company');

        resetTemplateData();
    }

    const deleteCompanyTemplate = async (
        id: number,
    ) => {
        resetTemplateData();

        const template = companyTemplates().find(template => template.id === id);
        if (!template) {
            return;
        }

        if (companyTemplate() === template.name) {
            setCompanyTemplate('');
            setCompanyFields([]);
        }

        const response = await invoke<PureResponse>(commands.delete_company_template, {
            ownedBy: loggedInUsername,
            id,
        });
        if (!response.status) {
            return;
        }

        setCompanyTemplates((prevTemplates) => prevTemplates.filter(template => template.id !== id));
    }

    const handleEditCompany = async () => {
        await invoke(commands.update_company, {
            ownedBy: loggedInUsername,
            id: editingCompany().id,
            name: companyName(),
            fields: JSON.stringify({
                template: companyTemplate(),
                data: companyFields,
            }),
            useForInvoicing: useForInvoicing(),
        });

        navigate(routes.companies);
    }

    const handleDeleteCompany = async () => {
        await invoke(commands.delete_company, {
            ownedBy: loggedInUsername,
            id: editingCompany().id,
        });

        navigate(routes.companies);
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

    onMount(async () => {
        if (!params.id) {
            return;
        }

        const company = await invoke<any>(commands.get_company, {
            ownedBy: loggedInUsername,
            id: parseInt(params.id),
        });
        if (!company) {
            return;
        }
        setEditingCompany(company);

        setCompanyTemplate(JSON.parse(company.fields).template);
        setCompanyName(company.name);
        setCompanyFields(JSON.parse(company.fields).data);
        setUseForInvoicing(company.use_for_invoicing);
    });


    const matchFallback = (
        <>
            <div>
                something went wrong
            </div>

            <BackHomeButton />
        </>
    );

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
                spellcheck={false}
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
                value={companyTemplateDefault()}
                toggle={() => {
                    setCompanyTemplateDefault(!companyTemplateDefault());
                }}
            />

            <button
                class="mt-8 disabled:opacity-50 disabled:pointer-events-none"
                onClick={() => {
                    generateNewCompanyTemplate();
                }}
                disabled={!companyTemplateName() || companyTemplateFields.length === 0}
            >
                Generate Company Template
            </button>

            {companyTemplate() ? (
                <BackHomeButton
                    atClick={() => {
                        setView('new-company');
                    }}
                />
            ) : (
                <BackHomeButton />
            )}
        </>
    );

    const editTemplates = (
        <>
            <For each={companyTemplates()}>
                {(template) => {
                    return (
                        <div class="flex justify-between">
                            <div>
                                {template.name}
                            </div>

                            <div
                                class="cursor-pointer select-none font-bold"
                                onClick={() => {
                                    deleteCompanyTemplate(template.id);
                                }}
                            >
                                delete
                            </div>
                        </div>
                    );
                }}
            </For>

            <BackHomeButton
                atClick={() => {
                    if (!companyTemplate()) {
                        setView('new-company-template');
                        return;
                    }

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
                    class="mb-4 flex items-center justify-center gap-1"
                >
                    <div>
                        using template
                    </div>

                    {companyTemplates().length === 1 ? (
                        <div>
                            {companyTemplate()}
                        </div>
                    ) : (
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
                    )}
                </div>

                <button
                    class="w-full"
                    onClick={() => {
                        setView('new-company-template');
                    }}
                >
                    New Company Template
                </button>

                <div
                    class="mt-4 cursor-pointer select-none font-bold"
                    onClick={() => {
                        setView('edit-templates');
                    }}
                >
                    edit templates
                </div>
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
                class="disabled:opacity-50 disabled:pointer-events-none"
                disabled={!companyName()}
            >
                Generate Company
            </button>

            <BackHomeButton />
        </>
    );

    const editCompany = (
        <>
            <h1>edit company {editingCompany() ? editingCompany().name : ''}</h1>

            <div
                class="my-8"
            >
                <div
                    class="mb-4 flex items-center justify-center gap-1"
                >
                    <div>
                        using template {companyTemplate()}
                    </div>
                </div>
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
                    handleEditCompany();
                }}
                class="disabled:opacity-50 disabled:pointer-events-none"
                disabled={!companyName()}
            >
                Edit Company
            </button>

            <div
                class="mt-4 cursor-pointer select-none font-bold"
                onClick={() => {
                    setView('delete-company');
                }}
            >
                delete company
            </div>

            <BackHomeButton
                atClick={() => {
                    navigate(routes.companies);
                }}
            />
        </>
    );

    const deleteCompany = (
        <>
            <h1>delete company {editingCompany() ? editingCompany().name : ''}?</h1>

            <button
                onClick={() => {
                    handleDeleteCompany();
                }}
            >
                Delete Company
            </button>

            <div
                class="mt-4 cursor-pointer select-none font-bold"
                onClick={() => {
                    setView('');
                }}
            >
                cancel
            </div>
        </>
    );

    return (
        <div class={`
            p-8 w-[400px] mx-auto text-center
            grid gap-4
            items-center
        `}>
            <Switch
                fallback={matchFallback}
            >
                <Match when={params.id && view() !== 'delete-company'}>
                    {editCompany}
                </Match>
                <Match when={params.id && view() === 'delete-company'}>
                    {deleteCompany}
                </Match>

                <Match when={view() === 'new-company-template'}>
                    {newCompanyTemplate}
                </Match>
                <Match when={view() === 'edit-templates'}>
                    {editTemplates}
                </Match>
                <Match when={view() === 'new-company'}>
                    {newCompany}
                </Match>
            </Switch>
        </div>
    );
}


export default NewCompany;
