import Input from '../Input';

import {
    InvoiceLine,
} from '../../data';

import Deleter from '../Deleter';



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
    const computeTotal = () => {
        const {
            price,
            quantity,
            vatRate,
        } = data;

        if (
            !price
            || !quantity
            || !vatRate
        ) {
            return '0';
        }

        const value = price * quantity;
        const vat = value * vatRate / 100;
        const total = value + vat;

        return total.toFixed(2);
    }


    return (
        <li
            className="grid gap-12 items-center md:flex"
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
                width={70}
                type="number"
            />

            <Input
                text="pret"
                value={data.price + ''}
                setValue={(value) => updateLine(index, 'price', value)}
                width={95}
                type="number"
            />

            <Input
                text="TVA"
                value={data.vatRate + ''}
                setValue={(value) => updateLine(index, 'vatRate', value)}
                width={35}
            />

            <Input
                text="total"
                value={computeTotal()}
                setValue={(_value) => {}}
                width={100}
                disabled={true}
            />

            <Deleter
                atDelete={() => removeLine(index)}
            />
        </li>
    );
}
