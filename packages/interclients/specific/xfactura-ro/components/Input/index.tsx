export default function Input({
    text,
    value,
    setValue,
}: {
    text: string,
    value: string,
    setValue: (value: string) => void,
}) {
    return (
        <div
            className="flex justify-between my-2"
        >
            <div>
                {text}
            </div>

            <input
                className="text-black w-[150px]"
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            />
        </div>
    );
}
