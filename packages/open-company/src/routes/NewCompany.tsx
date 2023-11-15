import { invoke } from '@tauri-apps/api/tauri';
import { createSignal } from 'solid-js';
import { A } from '@solidjs/router';

import './NewCompany.css';



function NewCompany() {
    const [companyName, setCompanyName] = createSignal('');


    return (
        <div class="container">
            <h1>new company</h1>

            <div class="flex gap-2 items-center">
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

                <A href="/">back</A>
            </div>
        </div>
    );
}


export default NewCompany;
