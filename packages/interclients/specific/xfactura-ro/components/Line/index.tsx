import Input from '../Input';

import {
    InvoiceLine,
} from '../../data';



export default function Line({
    data,
    index,
    updateLine,
    removeLine,
}: {
    data: InvoiceLine,
    index: number,
    updateLine: (index: number, type: string, value: string) => void,
    removeLine: (index: number) => void,
}) {
    return (
        <li
            className="flex gap-4"
        >
            <Input
                text="nume"
                value={data.name}
                setValue={(value) => updateLine(index, 'name', value)}
            />

            <Input
                text="cantitate"
                value={data.quantity + ''}
                setValue={(value) => updateLine(index, 'quantity', value)}
            />

            <Input
                text="pret"
                value={data.price + ''}
                setValue={(value) => updateLine(index, 'price', value)}
            />

            <Input
                text="TVA"
                value={data.vatRate + ''}
                setValue={(value) => updateLine(index, 'vatRate', value)}
            />

            <div>
                <button
                    onClick={() => removeLine(index)}
                >
                    ștergere
                </button>
            </div>
        </li>
    );
}
