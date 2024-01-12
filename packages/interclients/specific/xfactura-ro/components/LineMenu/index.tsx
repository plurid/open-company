import {
    useState,
} from 'react';

import Toggle from '../Toggle';
import Deleter from '../Deleter';

import {
    InvoiceLine,
} from '../../data';



const collapse = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 15 12 9 18 15"></polyline>
    </svg>
);

const expand = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);


export default function LineMenu({
    data,
    index,
    updateLine,
    removeLine,
}: {
    data: InvoiceLine;
    index: number;
    updateLine: (index: number, type: string, value: string | boolean) => void;
    removeLine: (index: number) => void;
}) {
    const [
        show,
        setShow,
    ] = useState(false);

    return (
        <div
            className="relative"
        >
            <button
                onClick={() => setShow(!show)}
            >
                {show ? (
                    <>{collapse}</>
                ) : (
                    <>{expand}</>
                )}
            </button>

            {show && (
                <div
                    className="absolute z-30 top-[30px] left-0 w-[180px] backdrop-blur-md shadow-2xl p-4 lg:right-0 lg:left-auto"
                >
                    <Toggle
                        text="TVA inclus"
                        value={data.vatIncluded}
                        toggle={() => updateLine(index, 'vatIncluded', !data.vatIncluded)}
                    />

                    <Deleter
                        atDelete={() => removeLine(index)}
                    />
                </div>
            )}
        </div>
    );
}
