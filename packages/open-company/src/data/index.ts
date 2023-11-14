export interface Address {
    id: string;
    value: string;
    country: string;
    location: string;
}

export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
}

export interface Company {
    id: string;
    name: string;
    addresses: Address[];
    contacts: Contact[];
}

export interface Item {
    id: string;
    name: string;
    unit: string;
    quantity: number;
    price: number;
}

export interface Invoice {
    id: string;
    from: string;
    to: string;
    items: Item[];
    total: number;
}
