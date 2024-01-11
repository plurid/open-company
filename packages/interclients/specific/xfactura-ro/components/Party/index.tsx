import {
    Dispatch,
    SetStateAction,
} from 'react';

import Input from '../Input';

import {
    NewParty,
    partyText,
    partyFields,
} from '../../data';



export default function Party({
    kind,
    title,
    data,
    setParty,
}: {
    kind: string,
    title: string,
    data: NewParty,
    setParty: Dispatch<SetStateAction<NewParty>>,
}) {
    const updateParty = (
        type: typeof partyFields[number],
    ) => {
        return (
            value: string,
        ) => {
            setParty(prevValues => ({
                ...prevValues,
                [type]: value,
            }));
        }
    }

    return (
        <div
            className="max-w-[300px] md:w-1/2 h-[300px] p-4 md:p-8"
        >
            <h2
                className="select-none text-center text-xl mb-4 md:text-left"
            >
                {title}
            </h2>

            <div>
                {partyFields.map(field => {
                    // if (field === 'county') {
                    //     return (
                    //         <div
                    //             key={kind + field}
                    //         >
                    //             TODO dropdown
                    //         </div>
                    //     );
                    // }

                    return (
                        <div
                            key={kind + field}
                        >
                            <Input
                                text={partyText[field]}
                                value={data[field]}
                                setValue={updateParty(field)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
