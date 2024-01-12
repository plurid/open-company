import {
    Dispatch,
    SetStateAction,
} from 'react';

import Line from '../Line';

import {
    InvoiceLine,
} from '../../data';

import {
    toFixed,
    financial,
} from '../../logic/utilities';



export default function Lines({
    data,
    setLines,
    addNewLine,
}: {
    data: InvoiceLine[];
    setLines: Dispatch<SetStateAction<InvoiceLine[]>>;
    addNewLine: () => void;
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

    const quantityPrice = (line: InvoiceLine) => financial(line.price * line.quantity);
    const vatValue = (line: InvoiceLine) => financial(quantityPrice(line) / (1 + line.vatRate / 100));

    const computeWithoutVAT = () => {
        return toFixed(
            financial(
                data.reduce((acc, line) => {
                    if (line.vatIncluded) {
                        return acc + vatValue(line);
                    }

                    return acc + quantityPrice(line);
                }, 0),
            ),
        );
    }

    const computeVAT = () => {
        return toFixed(
            financial(
                data.reduce((acc, line) => {
                    if (line.vatIncluded) {
                        return acc + financial(quantityPrice(line) - vatValue(line));
                    }

                    return acc + financial(quantityPrice(line) * line.vatRate / 100);
                }, 0),
            ),
        );
    }

    const computeTotal = () => {
        return toFixed(
            financial(
                data.reduce((acc, line) => {
                    if (line.vatIncluded) {
                        return acc + quantityPrice(line);
                    }

                    return acc + financial(quantityPrice(line) * (1 + line.vatRate / 100));
                }, 0),
            ),
        );
    }


    return (
        <div>
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

            <div
                className="grid place-content-center p-8"
            >
                <button
                    onClick={() => addNewLine()}
                    className="select-none focus:outline-none focus:ring-2 focus:ring-white"
                >
                    adăugare produs
                </button>
            </div>

            <div
                className="grid place-content-center p-8"
            >
                <div className="flex justify-between m-2 w-[200px]">
                    <div>
                        total fără TVA
                    </div>

                    <div>
                        {computeWithoutVAT()}
                    </div>
                </div>

                <div className="flex justify-between m-2 w-[200px]">
                    <div>
                        total TVA
                    </div>

                    <div>
                        {computeVAT()}
                    </div>
                </div>

                <div className="flex justify-between m-2 w-[200px]">
                    <div>
                        total
                    </div>
                    <div>
                        {computeTotal()}
                    </div>
                </div>
            </div>
        </div>
    );
}
