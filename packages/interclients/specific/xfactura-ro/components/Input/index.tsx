export default function Input({
    text,
    value,
    setValue,
    width,
    type,
    disabled,
}: {
    text: string,
    value: string,
    setValue: (value: string) => void,
    width?: number;
    type?: string;
    disabled?: boolean;
}) {
    return (
        <div
            className="flex justify-between my-2 gap-4"
        >
            <div
                className="select-none"
            >
                {text}
            </div>

            <input
                className="text-black w-[150px] bg-gray-800 text-white px-2 focus:outline-none focus:ring-2 focus:ring-white"
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                style={{
                    width,
                }}
                type={type}
                disabled={disabled}
            />
        </div>
    );
}
