import {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
} from 'react';

import {
    NewParty,
    partyText,
    partyFields,
} from '../../data';

import localStorage, {
    localKeys,
} from '../../data/localStorage';

import Input from '../Input';

import {
    getCompanyDetails,
} from '../../logic/requests';

import {
    normalizePartyName,
    normalizePartyCity,
    normalizePartyCounty,
    normalizeVatNumber,
} from '../../logic/validation';



const verifyData = (
    data: NewParty,
) => {
    return data.vatNumber
        && data.vatNumber.length > 5
        && data.name
        && data.country
        && data.county
        && data.city
        && data.address
}


export default function Party({
    kind,
    title,
    data,
    setParty,
}: {
    kind: 'seller' | 'buyer';
    title: string;
    data: NewParty;
    setParty: Dispatch<SetStateAction<NewParty>>;
}) {
    const [
        loadingVatNumber,
        setLoadingVatNumber,
    ] = useState(false);


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
                    setLoadingVatNumber(true);
                    const request: any = await getCompanyDetails(vatNumber);
                    setLoadingVatNumber(false);
                    if (request && request.status) {
                        const {
                            adresa_domiciliu_fiscal,
                            adresa_sediu_social,
                            date_generale,
                        } = request.data;

                        const name = date_generale.denumire;
                        const address = adresa_domiciliu_fiscal.ddenumire_Strada
                            ? (adresa_domiciliu_fiscal.ddenumire_Strada + ' ' + adresa_domiciliu_fiscal.dnumar_Strada)
                            : adresa_sediu_social.sdenumire_Strada
                                ? (adresa_sediu_social.sdenumire_Strada + ' ' + adresa_sediu_social.snumar_Strada)
                                : '';
                        const city = adresa_domiciliu_fiscal.ddenumire_Localitate || adresa_sediu_social.sdenumire_Localitate || '';
                        const county = adresa_domiciliu_fiscal.ddenumire_Judet || adresa_sediu_social.sdenumire_Judet || '';

                        setParty(prevValues => ({
                            ...prevValues,
                            name: name ? normalizePartyName(name) : prevValues.name,
                            address: address ? address : prevValues.address,
                            city: city ? normalizePartyCity(city) : prevValues.city,
                            county: county ? normalizePartyCounty(county) : prevValues.county,
                            country: 'România',
                        }));
                    } else {
                        setParty(prevValues => ({
                            ...prevValues,
                            vatNumber,
                        }));
                    }
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


    useEffect(() => {
        if (verifyData(data)) {
            localStorage.set(
                `${localKeys.company}${data.vatNumber}`,
                data,
            );
        }
    }, [
        data,
    ]);

    useEffect(() => {
        if (kind === 'seller' && verifyData(data)) {
            localStorage.set(
                localKeys.defaultSeller,
                data.vatNumber,
            );
        }
    }, [
        kind,
        data,
    ]);

    useEffect(() => {
        if (
            kind === 'seller'
            && localStorage.usingStorage
            && localStorage.defaultSeller
        ) {
            const defaultData = localStorage.companies[localStorage.defaultSeller];
            if (!defaultData) {
                return;
            }

            if (verifyData(defaultData)) {
                setParty(defaultData);
            }
        }
    }, [
        kind,
        setParty,
    ]);


    return (
        <div
            className="max-w-[400px] md:w-1/2 min-h-[300px] p-4 md:p-8"
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
                                loading={field === 'vatNumber' && loadingVatNumber}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
