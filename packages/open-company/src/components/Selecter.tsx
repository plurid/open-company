import {
    createSignal,
    For,
    Show,
} from 'solid-js';



function Selecter({
    data,
    renderItem,
    height,
} : {
    data: any[],
    renderItem: (item: any) => any,
    height?: number,
}) {
    const [search, setSearch] = createSignal('');

    const dataRender = (
        item: any,
    ) => {
        const {
            name,
        } = item;

        return (
            <Show
                when={!(
                    search()
                    && !name.toLowerCase().includes(search().toLowerCase())
                )}
                keyed
            >
                {renderItem(item)}
            </Show>
        );
    }

    return (
        <div>
            <input
                class="w-full mb-2"
                type="text"
                placeholder="search"
                value={search()}
                onInput={(e) => {
                    setSearch(e.currentTarget.value);
                }}
            />

            <div
                class={`h-[${height || '400'}px] max-h-[400px] overflow-y-auto`}
            >
                <For each={data}>
                    {dataRender}
                </For>
            </div>
        </div>
    );
}


export default Selecter;
