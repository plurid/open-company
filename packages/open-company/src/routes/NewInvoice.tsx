import { createSignal, For } from 'solid-js';
import { A } from '@solidjs/router';

import './NewInvoice.css';



function NewInvoice() {
    const [items, setItems] = createSignal<string[]>([]);


    return (
        <div class={`
            h-full p-8
        `}>
            <h1>new invoice</h1>

            <div>
                new item
            </div>

            <For each={items()}>
                {(item, i) =>
                    <li>
                        {i() + 1}: {item}
                    </li>
                }
            </For>

            <A href="/">
                back
            </A>
        </div>
    );
}


export default NewInvoice;
