import Input from '../Input';
import Toggle from '../Toggle';

import {
    InvoiceLine,
} from '../../data';

import Deleter from '../Deleter';



function toFixed(
    num: number,
    fixed: number = 2,
) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)![0].replace('.', ',');
}


export default function Line({
    data,
    index,
    updateLine,
    removeLine,
}: {
    data: InvoiceLine,
    index: number,
    updateLine: (index: number, type: string, value: string | boolean) => void,
    removeLine: (index: number) => void,
}) {
    const computeTotal = () => {
        const {
            price,
            quantity,
            vatRate,
            vatIncluded,
        } = data;

        if (
            !price
            || !quantity
            || !vatRate
        ) {
            return '0';
        }

        const priceInUnits = price * 100;
        const valueInUnits = priceInUnits * quantity;

        if (vatIncluded) {
            return toFixed(valueInUnits / 100);
        }

        const vatInUnits = valueInUnits * vatRate / 100;
        const totalInUnits = valueInUnits + vatInUnits;
        const total = totalInUnits / 100;

        return toFixed(total);
    }


    return (
        <li
            className="grid gap-1 mb-10 items-center xl:flex xl:gap-12 xl:mb-4"
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

            <Toggle
                text="TVA inclus"
                value={data.vatIncluded}
                toggle={() => updateLine(index, 'vatIncluded', !data.vatIncluded)}
            />

            <Deleter
                atDelete={() => removeLine(index)}
            />
        </li>
    );
}
