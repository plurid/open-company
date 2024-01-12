import {
    DetailedHTMLProps,
    InputHTMLAttributes,
} from 'react';



export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;


export default function Input({
    text,
    value,
    setValue,
    width,
    type,
    disabled,
    inputProps,
}: {
    text: string;
    value: string;
    setValue: (value: string) => void;
    width?: number;
    type?: string;
    disabled?: boolean;
    inputProps?: InputProps;
}) {
    return (
        <div
            className="flex items-center justify-between my-2 gap-4"
        >
            <div
                className="select-none"
            >
                {text}
            </div>

            <input
                className="bg-gray-800 w-[200px] p-2 border-none rounded-none text-white focus:outline-none focus:ring-2 focus:ring-white disabled:bg-gray-600"
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                style={{
                    width,
                }}
                type={type}
                disabled={disabled}
                {...inputProps}
            />
        </div>
    );
}
