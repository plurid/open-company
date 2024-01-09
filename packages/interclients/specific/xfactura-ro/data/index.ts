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
    quantity: number;
}
