import {
    For,
    Accessor,
    createSignal,
} from 'solid-js';



function Dropdown({
    selected,
    select,
    selectables,
}: {
    selected:  Accessor<string>;
    select: (value: string) => void;
    selectables: () => string[];
}) {
    const [show, setShow] = createSignal(false);

    return (
        <div
            class="relative"
        >
            <button
                class={`
                    text-white bg-blue-700 hover:bg-blue-800
                    focus:ring-4 focus:outline-none focus:ring-blue-300
                    font-medium rounded-lg text-sm px-5 py-2.5 text-center
                    inline-flex items-center m-4
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                `}
                type="button"
                onClick={() => setShow(!show())}
            >
                {selected()}

                <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>

            <div
                class={`
                    absolute top-[70px] right-[16px]
                    w-[200px]
                    z-10 ${show() ? 'block' : 'hidden'} bg-white divide-y divide-zinc-100 rounded-lg shadow w-44 dark:bg-zinc-700
                `}
            >
                <ul
                    class="py-2 text-sm text-zinc-700 dark:text-zinc-200"
                >
                    <For each={selectables()}>
                        {(selectable) => {
                            return (
                                <li>
                                    <div
                                        class={`
                                            block
                                            px-4 py-2
                                            cursor-pointer
                                            hover:bg-zinc-100
                                            dark:hover:bg-zinc-600
                                            dark:hover:text-white
                                            ${selected() === selectable ? 'bg-zinc-100 dark:bg-zinc-600' : ''}
                                        `}
                                        onClick={() => {
                                            select(selectable);
                                            setShow(false);
                                        }}
                                    >
                                        {selectable}
                                    </div>
                                </li>
                            );
                        }}
                    </For>
                </ul>
            </div>
        </div>
    );
}


export default Dropdown;
