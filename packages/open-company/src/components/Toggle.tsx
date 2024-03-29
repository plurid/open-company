function Toggle({
    text,
    value,
    toggle,
}: {
    text: string;
    value: boolean;
    toggle: () => void;
}) {
    return (
        <div class="flex min-w-[280px] justify-between p-4">
            <span>
                {text}
            </span>

            <label class="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={value}
                    class="sr-only peer"
                    onChange={() => {
                        toggle();
                    }}
                />
                <div class={`
                    w-11 h-6 bg-gray-200
                    peer-focus:outline-none
                    peer-focus:ring-2
                    peer-focus:ring-white
                    dark:peer-focus:ring-white
                    rounded-full peer
                    dark:bg-gray-500
                    peer-checked:after:translate-x-full
                    rtl:peer-checked:after:-translate-x-full
                    peer-checked:after:border-white
                    after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                    after:bg-white after:border-gray-300 after:border
                    after:rounded-full after:h-5 after:w-5
                    after:transition-all
                    dark:border-gray-600
                    peer-checked:bg-blue-600
                `}/>
            </label>
        </div>
    );
}


export default Toggle;
