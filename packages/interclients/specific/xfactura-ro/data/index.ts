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


export interface Metadata {
    number: string,
    currency: string,
    issueDate: number,
    dueDate: number,
}

export const emptyMetadata: Metadata = {
    number: '',
    currency: 'RON',
    issueDate: Date.now(),
    dueDate: Date.now(),
};


export const countyMap: Record<string, string> = {
    'Alba': 'AB',
    'Arad': 'AR',
    'Arges': 'AG',
    'Bacău': 'BC',
    'Bihor': 'BH',
    'Bistrița-Năsăud': 'BN',
    'Botoşani': 'BT',
    'Braşov': 'BV',
    'Brăila': 'BR',
    'București': 'B',
    'Buzău': 'BZ',
    'Caraş-Severin': 'CS',
    'Cluj': 'CJ',
    'Constanţa': 'CT',
    'Covasna': 'CV',
    'Călărași': 'CL',
    'Dolj': 'DJ',
    'Dâmbovița': 'DB',
    'Galați': 'GL',
    'Giurgiu': 'GR',
    'Gorj': 'GJ',
    'Harghita': 'HR',
    'Hunedoara': 'HD',
    'Ialomiţa': 'IL',
    'Iaşi': 'IS',
    'Ilfov': 'IF',
    'Maramureş': 'MM',
    'Mehedinți': 'MH',
    'Mureş': 'MS',
    'Neamț': 'NT',
    'Olt': 'OT',
    'Prahova': 'PH',
    'Satu Mare': 'SM',
    'Sibiu': 'SB',
    'Suceava': 'SV',
    'Sălaj': 'SJ',
    'Teleorman': 'TR',
    'Timiș': 'TM',
    'Tulcea': 'TL',
    'Vaslui': 'VS',
    'Vrancea': 'VN',
    'Vâlcea': 'VL',
};


export const acceptedInvoiceFiles = ".jpg,.jpeg,.png,.pdf,.docx,.xlsx,.xml,.json";
