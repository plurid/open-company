import {
    Show,
} from 'solid-js';



function InputTitle ({
    title,
    value,
    atInput,
    ...rest
} : {
    title: string,
    value: () => string | number,
    atInput: (value: string) => void,

    placeholder?: string;
    class?: string;
    required?: boolean;
    type?: string;
    onInput?: (e: any) => void;
}) {
    return (
        <div>
            <div
                class="h-[30px]"
            >
                <Show
                    when={value() !== ''}
                >
                    <label class="block text-sm font-medium text-left mb-2">
                        {title}
                    </label>
                </Show>
            </div>

            <input
                value={value()}
                onInput={(e) => atInput(e.currentTarget.value)}
                {...rest}
            />
        </div>
    );
}


export default InputTitle;
