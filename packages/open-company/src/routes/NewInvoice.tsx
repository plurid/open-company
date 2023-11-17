import { createSignal, For } from 'solid-js';

import './NewInvoice.css';

import BackHomeButton from '../components/BackHomeButton';



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

            <BackHomeButton />
        </div>
    );
}


export default NewInvoice;
