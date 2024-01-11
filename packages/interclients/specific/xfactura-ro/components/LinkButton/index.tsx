import {
    DetailedHTMLProps,
    ButtonHTMLAttributes,
} from 'react';



export type LinkButtonProps = {
    text: string | JSX.Element,
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;


export default function LinkButton({
    text,
    ...rest
}: LinkButtonProps) {
    return (
        <button
            className="cursor-pointer select-none font-bold focus:outline-none focus:ring-2 focus:ring-white"
            {...rest}
        >
            {text}
        </button>
    );
}
