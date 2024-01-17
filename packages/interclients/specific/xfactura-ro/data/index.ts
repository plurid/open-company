export const newParty = {
    vatNumber: '',
    name: '',
    address: '',
    city: '',
    county: '',
    country: 'România',
};

export const partyText = {
    vatNumber: 'CUI',
    name: 'nume',
    country: 'țară',
    county: 'județ',
    city: 'localitate',
    address: 'adresă',
} as const;

export const partyFields = [
    'vatNumber',
    'name',
    'country',
    'county',
    'city',
    'address',
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


export const countryMap: Record<string, string> = {
    'Romania': 'RO',
};


export const acceptedInvoiceFiles = '.jpg,.jpeg,.png,.pdf,.docx,.xlsx,.xml,.json';


export const COMPANY_DETAILS_API = `${process.env.NEXT_PUBLIC_X_DOMAIN}/api/company_details`;
export const EINVOICE_API = `${process.env.NEXT_PUBLIC_X_DOMAIN}/api/einvoice`;


export const ENVIRONMENT = {
    IN_PRODUCTION: process.env.NEXT_PUBLIC_IN_PRODUCTION,
    X_DOMAIN: process.env.NEXT_PUBLIC_X_DOMAIN,
};


export type ResponseData = {
    status: boolean;
    data?: any;
}
