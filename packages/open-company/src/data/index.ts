export interface PureResponse {
    status: boolean;
}

export interface StringResponse {
    status: boolean;
    data: string;
}



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



export const commands = {
    show_main_window: 'show_main_window',
    check_database_exists: 'check_database_exists',
    check_users_exist: 'check_users_exist',
    start_database: 'start_database',
    generate_new_user: 'generate_new_user',
    login_user: 'login_user',
    generate_new_address: 'generate_new_address',
    generate_new_contact: 'generate_new_contact',
    generate_new_company: 'generate_new_company',
    generate_new_item: 'generate_new_item',
    generate_new_invoice: 'generate_new_invoice',

    get_users: 'get_users',
} as const;


export const routes = {
    index: '/',
    new_database: '/new-database',
    new_user: '/new-user',
    login_user: '/login_user',
    new_company: '/new-company',
    new_invoice: '/new-invoice',

    users: '/users',
    companies: '/companies',
    contacts: '/contacts',
    items: '/items',
    contracts: '/contracts',
    invoices: '/invoices',
} as const;


export const localStore = {
    loggedIn: 'loggedIn',
    activeDatabase: 'activeDatabase',
} as const;



export * from './styles';
