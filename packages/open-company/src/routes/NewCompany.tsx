import { invoke } from '@tauri-apps/api/tauri';
import { createSignal } from 'solid-js';
import { A } from '@solidjs/router';

import './NewCompany.css';



function NewCompany() {
    const [companyName, setCompanyName] = createSignal('');


    return (
        <div class={`
            h-full p-8 w-[400px] mx-auto text-center
            grid gap-4 content-center place-content-center
        `}>
            <h1>new company</h1>

            <input
                placeholder="company name"
                required
                value={companyName()}
                onInput={(e) => setCompanyName(e.currentTarget.value)}
            />

            <button
                onClick={() => {
                    invoke('generate_new_company', {
                        name: companyName(),
                    });
                }}
            >
                Generate Company
            </button>

            <A
                href="/"
                class="mt-12"
            >
                back
            </A>
        </div>
    );
}


export default NewCompany;
