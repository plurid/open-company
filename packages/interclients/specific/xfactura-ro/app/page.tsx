'use client';

import {
    useState,
} from 'react';

import Party from '../components/Party';
import Input from '../components/Input';

import {
    newParty,
    NewParty,
    InvoiceLine,
} from '../data';



export default function Home() {
    const [
        seller,
        setSeller,
    ] = useState<NewParty>({
        ...newParty,
    });

    const [
        buyer,
        setBuyer,
    ] = useState<NewParty>({
        ...newParty,
    });

    const [
        metadata,
        setMetadata,
    ] = useState({
        number: '',
        currency: '',
        issueDate: Date.now(),
        dueDate: Date.now(),
    });

    const emptyLine = {
        name: '',
        price: 1,
        quantity: 1,
        vatRate: 19,
    };

    const [
        lines,
        setLines,
    ] = useState<InvoiceLine[]>([{
        ...emptyLine,
    }]);


    const updateMetadata = (
        type: any,
        value: string | number,
    ) => {
        setMetadata(prevValues => ({
            ...prevValues,
            [type]: value,
        }));
    }

    const updateLine = (
        index: number,
        type: string,
        value: string,
    ) => {
        const newLines = lines.map((line, idx) => {
            if (idx === index) {
                return {
                    ...line,
                    [type]: value,
                };
            }

            return {
                ...line,
            };
        });

        setLines(newLines);
    }

    const addNewLine = () => {
        setLines(prevValues => ([
            ...prevValues,
            emptyLine,
        ]));
    }

    const removeLine = (
        index: number,
    ) => {
        const newLines = lines.filter((_, idx) => index !== idx);
        setLines(newLines);
    }


    return (
        <div>
            <div
                className="grid md:flex"
            >
                <div
                    className="w-full md:w-1/2 h-[300px]"
                >
                    <h1>
                        furnizor
                    </h1>

                    <Party
                        kind="seller"
                        data={seller}
                        setParty={setSeller}
                    />
                </div>

                <div
                    className="w-full md:w-1/2 h-[300px]"
                >
                    <h2>
                        cumpărător
                    </h2>

                    <Party
                        kind="buyer"
                        data={buyer}
                        setParty={setBuyer}
                    />
                </div>
            </div>

            <div
                className="grid place-content-center p-8"
            >
                <Input
                    text="număr factură"
                    value={metadata.number}
                    setValue={(value) => updateMetadata('number', value)}
                />

                <Input
                    text="monedă"
                    value={metadata.currency}
                    setValue={(value) => updateMetadata('currency', value)}
                />

                <Input
                    text="dată emitere"
                    value={metadata.issueDate + ''}
                    setValue={(value) => updateMetadata('issueDate', value)}
                />

                <Input
                    text="dată scadență"
                    value={metadata.dueDate + ''}
                    setValue={(value) => updateMetadata('dueDate', value)}
                />
            </div>

            <div>
                <ul
                    className="grid place-content-center p-8"
                >
                    {lines.map((line, index) => {
                        return (
                            <li
                                className="flex gap-4"
                                key={'item' + index}
                            >
                                <Input
                                    text="nume"
                                    value={line.name}
                                    setValue={(value) => updateLine(index, 'name', value)}
                                />

                                <Input
                                    text="cantitate"
                                    value={line.quantity + ''}
                                    setValue={(value) => updateLine(index, 'quantity', value)}
                                />

                                <Input
                                    text="pret"
                                    value={line.price + ''}
                                    setValue={(value) => updateLine(index, 'price', value)}
                                />

                                <Input
                                    text="TVA"
                                    value={line.vatRate + ''}
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
                    })}
                </ul>
            </div>

            <div
                className="grid place-content-center p-8"
            >
                <button
                    onClick={() => addNewLine()}
                >
                    adăugare produs
                </button>
            </div>

            <div
                className="grid place-content-center p-8"
            >
                <button>
                    generare efactura
                </button>
            </div>
        </div>
    );
}
