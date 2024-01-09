import {
    Dispatch,
    SetStateAction,
} from 'react';

import Line from '../Line';

import {
    InvoiceLine,
} from '../../data';



export default function Lines({
    data,
    setLines,
}: {
    data: InvoiceLine[],
    setLines: Dispatch<SetStateAction<InvoiceLine[]>>,
}) {
    const updateLine = (
        index: number,
        type: string,
        value: string | boolean,
    ) => {
        const newLines = data.map((line, idx) => {
            if (idx === index) {
                const parsedValue = typeof value === 'number' &&
                    (type === 'price' || type === 'quantity' || type === 'vatRate')
                    ? parseFloat(value)
                    : value;

                return {
                    ...line,
                    [type]: parsedValue,
                };
            }

            return {
                ...line,
            };
        });

        setLines(newLines);
    }

    const removeLine = (
        index: number,
    ) => {
        const newLines = data.filter((_, idx) => index !== idx);
        setLines(newLines);
    }


    return (
        <ul
            className="grid place-content-center p-2 md:p-8"
        >
            {data.length === 0 && (
                <div>
                    niciun produs
                </div>
            )}

            {data.map((line, index) => {
                return (
                    <Line
                        key={'line' + index}
                        data={line}
                        index={index}
                        updateLine={updateLine}
                        removeLine={removeLine}
                    />
                );
            })}
        </ul>
    );
}
