import {
    Dispatch,
    SetStateAction,
} from 'react';

import {
    NewParty,
    partyText,
    partyFields,
} from '../../data';

import Input from '../Input';

import {
    getCompanyDetails,
} from '../../logic/requests';

import {
    normalizeVatNumber,
} from '../../logic/validation';



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
        return async (
            value: string,
        ) => {
            if (type === 'vatNumber' && normalizeVatNumber(value).length > 5) {
                try {
                    setParty(prevValues => ({
                        ...prevValues,
                        vatNumber: value,
                    }));

                    const vatNumber = normalizeVatNumber(value);
                    const request: any = await getCompanyDetails(vatNumber);
                    if (request && request.status) {
                        const {
                            adresa_domiciliu_fiscal,
                            adresa_sediu_social,
                            date_generale,
                        } = request.data;

                        const name = date_generale.denumire;
                        if (name) {
                            setParty(prevValues => ({
                                ...prevValues,
                                name: name.replace('S.R.L.', 'SRL'),
                            }));
                        }

                        const address = adresa_domiciliu_fiscal.ddenumire_Strada
                            ? (adresa_domiciliu_fiscal.ddenumire_Strada + ' ' + adresa_domiciliu_fiscal.dnumar_Strada)
                            : adresa_sediu_social.sdenumire_Strada
                                ? (adresa_sediu_social.sdenumire_Strada + ' ' + adresa_sediu_social.snumar_Strada)
                                : '';
                        if (address) {
                            setParty(prevValues => ({
                                ...prevValues,
                                address,
                            }));
                        }

                        const city = adresa_domiciliu_fiscal.ddenumire_Localitate || adresa_sediu_social.sdenumire_Localitate || '';
                        if (city) {
                            setParty(prevValues => ({
                                ...prevValues,
                                city: city.replace('Mun. ', ''),
                            }));
                        }

                        const county = adresa_domiciliu_fiscal.ddenumire_Judet || adresa_sediu_social.sdenumire_Judet || '';
                        if (county) {
                            setParty(prevValues => ({
                                ...prevValues,
                                county,
                            }));
                        }
                    }

                    setParty(prevValues => ({
                        ...prevValues,
                        vatNumber,
                    }));
                } catch (error) {
                    setParty(prevValues => ({
                        ...prevValues,
                        vatNumber: value,
                    }));
                    return;
                }
            }

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
