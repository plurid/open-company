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
    data,
    setParty,
}: {
    kind: string,
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
        >
            {partyFields.map(field => {
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
    );
}
