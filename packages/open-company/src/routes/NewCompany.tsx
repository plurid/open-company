import { invoke } from '@tauri-apps/api/tauri';
import { createSignal } from 'solid-js';

import './NewCompany.css';

import BackHomeButton from '../components/BackHomeButton';
import Toggle from '../components/Toggle';



function NewCompany() {
    const [companyName, setCompanyName] = createSignal('');
    const [companyID, setCompanyID] = createSignal('');
    const [companyAddress, setCompanyAddress] = createSignal('');
    const [companyCountry, setCompanyCountry] = createSignal('');
    const [companyContact, setCompanyContact] = createSignal('');
    const [useForInvoicing, setUseForInvoicing] = createSignal(false);


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

            <input
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
            />

            <Toggle
                text="use for invoicing"
                value={useForInvoicing()}
                toggle={() => {
                    setUseForInvoicing(!useForInvoicing());
                }}
            />

            <button
                onClick={() => {
                    invoke('generate_new_company', {
                        name: companyName(),
                        identification: companyID(),
                        address: companyAddress(),
                        country: companyCountry(),
                        contact: companyContact(),
                        useForInvoicing: useForInvoicing(),
                    });
                }}
            >
                Generate Company
            </button>

            <BackHomeButton />
        </div>
    );
}


export default NewCompany;
