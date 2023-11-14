import { createSignal } from 'solid-js';
import { A } from '@solidjs/router';

import './NewInvoice.css';



function NewInvoice() {
    const [items, setItems] = createSignal('');


    return (
        <div class="container">
            <h1>new invoice</h1>

            <A href="/">back</A>
        </div>
    );
}


export default NewInvoice;
