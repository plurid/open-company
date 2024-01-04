'use client';

import {
    useState,
} from 'react';

import Party from '../components/Party';
import Input from '../components/Input';
import Lines from '../components/Lines';

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


    const addNewLine = () => {
        setLines(prevValues => ([
            ...prevValues,
            emptyLine,
        ]));
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
                <Lines
                    data={lines}
                    setLines={setLines}
                />
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
