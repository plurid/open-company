import {
    writeBinaryFile,
    BaseDirectory,
} from '@tauri-apps/api/fs';
import {
    PDFDocument,
    // StandardFonts,
} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

import { invoke } from '@tauri-apps/api/tauri';
import {
    createSignal,
    onMount,
    For,
    Show,
} from 'solid-js';
import { useNavigate } from '@solidjs/router';

import './NewInvoice.css';

import Selecter from '../components/Selecter';
import BackHomeButton from '../components/BackHomeButton';

import {
    localStore,
    commands,
    routes,
} from '../data';



function FieldsRender({
    company,
} : {
    company: any,
}) {
    const fields = JSON.parse(company.fields).data;

    return (
        <For each={fields}>
            {(field) =>
                <div>
                    {field.name}: {field.value}
                </div>
            }
        </For>
    );
}


function NewInvoice() {
    const [companies, setCompanies] = createSignal<any[]>([]);
    const [items, setItems] = createSignal<any[]>([]);
    const [invoicingCompany, setInvoicingCompany] = createSignal<any>(null);
    const [selectingInvoicingCompany, setSelectingInvoicingCompany] = createSignal(true);
    const [invoiceeCompany, setInvoiceeCompany] = createSignal<any>(null);
    const [selectingInvoiceeCompany, setSelectingInvoiceeCompany] = createSignal(true);
    const [invoicingItems, setInvoicingItems] = createSignal<any[]>([]);

    const navigate = useNavigate();

    const loggedInUsername = localStorage.getItem(localStore.loggedIn);


    const saveInvoice = () => {

    };

    const downloadPDF = async () => {
        const url = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf';
        const fontBytes = await fetch(url).then((res) => res.arrayBuffer());

        const pdfDoc = await PDFDocument.create();

        pdfDoc.setTitle('invoice');
        pdfDoc.setAuthor('open company');
        pdfDoc.setSubject('invoice');
        pdfDoc.setKeywords(['invoice']);
        pdfDoc.setProducer('open company');
        pdfDoc.setCreator('open company');

        pdfDoc.registerFontkit(fontkit);
        const ubuntuFont = await pdfDoc.embedFont(fontBytes);

        // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const page = pdfDoc.addPage();
        page.drawText(
            JSON.stringify(invoicingCompany()),
            {
                x: 50,
                y: 750,
                size: 12,
                // maxWidth: 50,
                maxWidth: page.getWidth(),
                wordBreaks: [" "],
                // font: helveticaFont,
                font: ubuntuFont,
            },
        );
        const pdfBytes = await pdfDoc.save();

        await writeBinaryFile('foo.pdf', pdfBytes, {
            dir: BaseDirectory.Desktop,
        });
    }


    onMount(async () => {
        if (!loggedInUsername) {
            return;
        }

        const companies = await invoke<any[]>(commands.get_companies, {
            ownedBy: loggedInUsername,
        });
        setCompanies(companies);

        const items = await invoke<any[]>(commands.get_items, {
            ownedBy: loggedInUsername,
        });
        setItems(items);
    });


    return (
        <div class={`
            p-8 w-[400px] mx-auto
            grid gap-4
            justify-items-center
        `}>
            <h1>new invoice</h1>

            <Show when={companies().length === 0}>
                <div>
                    no companies found
                </div>

                <button
                    class="h-[50px]"
                    onClick={() => {
                        navigate(routes.new_company);
                    }}
                >
                    New Company
                </button>
            </Show>

            <Show when={companies().length > 0}>
                <Show when={selectingInvoicingCompany()}>
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
                                            setSelectingInvoicingCompany(false);
                                        }}
                                    >
                                        {company.name}
                                    </div>
                                </Show>
                            );
                        }}
                        height={50}
                    />
                </Show>


                <Show when={selectingInvoiceeCompany()}>
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
                                            setSelectingInvoiceeCompany(false);
                                        }}
                                    >
                                        {company.name}
                                    </div>
                                </Show>
                            );
                        }}
                        height={50}
                    />
                </Show>
            </Show>


            <Show when={items().length === 0}>
                <div>
                    no items found
                </div>

                <button
                    class="h-[50px]"
                    onClick={() => {
                        navigate(routes.new_item);
                    }}
                >
                    New Item
                </button>
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

            <div
                class="grid gap-2"
            >
                <Show when={invoicingCompany()}>
                    <Show when={!selectingInvoicingCompany()}>
                        <div
                            class="cursor-pointer select-none font-bold"
                            onClick={() => {
                                setInvoicingCompany(null);
                                setSelectingInvoicingCompany(true);
                            }}
                        >
                            change invoicing company
                        </div>
                    </Show>

                    <div>
                        {invoicingCompany().name}

                        <FieldsRender
                            company={invoicingCompany()}
                        />
                    </div>
                </Show>

                <Show when={invoiceeCompany()}>
                    <Show when={!selectingInvoiceeCompany()}>
                        <div
                            class="cursor-pointer select-none font-bold"
                            onClick={() => {
                                setInvoiceeCompany(null);
                                setSelectingInvoiceeCompany(true);
                            }}
                        >
                            change invoicee company
                        </div>
                    </Show>

                    <div>
                        {invoiceeCompany().name}

                        <FieldsRender
                            company={invoiceeCompany()}
                        />
                    </div>
                </Show>
            </div>

            <For each={invoicingItems()}>
                {(item, i) =>
                    <li>
                        {i() + 1}: {item.name} {item.price} {item.currency} {item.unit} {item.default_quantity}
                    </li>
                }
            </For>


            <button
                class="h-[50px]"
                onClick={() => {
                    downloadPDF();
                }}
            >
                Download PDF
            </button>

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
