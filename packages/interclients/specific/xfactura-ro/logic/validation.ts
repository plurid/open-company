import {
    NewParty,
    InvoiceLine,
    Metadata,

    countyMap,
} from '../data';



export const normalizeDiacritics = (
    value: string,
) => {
    return value
        .replace(/ă/g, 'a')
        .replace(/â/g, 'a')
        .replace(/î/g, 'i')
        .replace(/ș/g, 's')
        .replace(/ş/g, 's')
        .replace(/ț/g, 't')
        .replace(/ţ/g, 't');
}


export const normalizedCountyString = (
    value: string,
) => {
    const normalizedValue = value
        .trim()
        .toLowerCase()
        .replace(/ /g, '')
        .replace(/-/g, '')

    return normalizeDiacritics(normalizedValue);
}

export const normalizedUserCounty = (
    userCounty: string,
) => {
    const normalizedUserCounty = normalizedCountyString(userCounty);

    for (const [key, value] of Object.entries(countyMap)) {
        const normalizedKey = normalizedCountyString(key);

        if (normalizedKey === normalizedUserCounty) {
            return value;
        }
    }
}


export const checkValidParty = (party: NewParty) => {
    const validName = party.name.length > 0;
    const validVatNumber = party.vatNumber.length > 0;
    const validCounty = party.county.length > 0 && !!normalizedUserCounty(party.county);
    const validCity = party.city.length > 0;
    const validAddress = party.address.length > 0;

    return (
        validName &&
        validVatNumber &&
        validCounty &&
        validCity &&
        validAddress
    );
}


export const checkValidLine = (line: InvoiceLine) => {
    const validName = line.name.length > 0;
    const validQuantity = line.quantity > 0;
    const validPrice = line.price > 0;

    return (
        validName &&
        validQuantity &&
        validPrice
    );
}


export const checkValidMetadata = (metadata: Metadata) => {
    const validNumber = metadata.number.length > 0;
    const validCurrency = metadata.currency.length > 0;
    const validIssueDate = metadata.issueDate > 0;
    const validDueDate = metadata.dueDate > 0;

    return (
        validNumber &&
        validCurrency &&
        validIssueDate &&
        validDueDate
    );
}


export const normalizeVatNumber = (
    vatNumber: string,
) => vatNumber
    .replace(/\s/g, '')
    .replace('RO', '');


export const toNormalCase = (
    value: string,
) => {
    const letters = [];
    const chars = [...value];

    for (const [idx, letter] of chars.entries()) {
        if (idx === 0) {
            letters.push(letter.toUpperCase());
            continue;
        }

        const previousChar = chars[idx - 1];
        if (previousChar === ' ' || previousChar === '-') {
            letters.push(letter.toUpperCase());
            continue;
        } else {
            letters.push(letter.toLowerCase());
        }
    }

    return letters.join('').trim();
}


export const normalizePartyName = (
    value: string,
) => {
    return toNormalCase(value)
        .replace(/S.r.l.$/, 'SRL')
        .replace(/S.a.$/, 'SA');
}


export const normalizePartyCity = (
    value: string,
) => {
    return value.replace('Mun. ', '');
}


export const normalizePartyCounty = (
    value: string,
) => {
    return toNormalCase(value);
}
