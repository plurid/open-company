export const newParty = {
    name: '',
    vatNumber: '',
    address: '',
    city: '',
    county: '',
    country: 'Romania',
};

export const partyText = {
    name: 'nume',
    vatNumber: 'CUI',
    address: 'adresă',
    city: 'oraș',
    county: 'județ',
    country: 'țară',
} as const;

export const partyFields = [
    'name',
    'vatNumber',
    'address',
    'city',
    'county',
    'country',
] as const;

export type NewParty = typeof newParty;


export type InvoiceLine = {
    name: string;
    price: number;
    vatRate: number;
    vatIncluded: boolean;
    quantity: number;
}

export const emptyInvoiceLine: InvoiceLine = {
    name: '',
    price: 100,
    quantity: 1,
    vatRate: 19,
    vatIncluded: false,
};
