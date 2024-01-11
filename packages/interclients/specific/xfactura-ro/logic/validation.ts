import {
    NewParty,
    InvoiceLine,
    Metadata,

    countyMap,
} from '../data';



const normalizedCountyString = (
    value: string,
) => {
    return value
        .trim()
        .toLowerCase()
        .replace(/ /g, '')
        .replace(/-/g, '')
        .replace(/ă/g, 'a')
        .replace(/â/g, 'a')
        .replace(/î/g, 'i')
        .replace(/ș/g, 's')
        .replace(/ş/g, 's')
        .replace(/ț/g, 't')
        .replace(/ţ/g, 't');
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
