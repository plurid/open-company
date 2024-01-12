import {
    NewParty,
} from './index';



export const localKeys = {
    usingStorage: 'usingStorage',
    defaultSeller: 'defaultSeller',
    company: 'company-',
    invoice: 'invoice-',
} as const;

export type Keys = 'usingStorage' | 'defaultSeller';
export type CompanyKey = `company-${string}`;
export type InvoiceKey = `invoice-${string}`;
export type LocalStorageKey = Keys | CompanyKey | InvoiceKey;


const setLocalStorage = <V = any>(
    key: LocalStorageKey,
    value: V,
) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const getLocalStorage = (
    key: LocalStorageKey,
    defaultValue: any = undefined,
) => {
    try {
        const value = localStorage.getItem(key);

        if (value === null) {
            setLocalStorage(key, defaultValue);

            return defaultValue;
        }

        return JSON.parse(value);
    } catch (error) {
        setLocalStorage(key, defaultValue);

        return defaultValue;
    }
}

const deleteLocalStorage = (
    key: LocalStorageKey,
) => {
    localStorage.removeItem(key);
}

const getAllLocalStorage = <V = any>(
    keyStart: string,
) => {
    const values: Record<string, V> = {};

    const items = Object.keys(localStorage).filter(key => key.startsWith(keyStart));
    for (const item of items) {
        const value = getLocalStorage(item as LocalStorageKey, {});
        values[item.replace(keyStart, '')] = value as V;
    }

    return values;
}

const deleteAllLocalStorage = (
    keyStart: string,
) => {
    const items = Object.keys(localStorage).filter(key => key.startsWith(keyStart));
    for (const item of items) {
        deleteLocalStorage(item as LocalStorageKey);
    }
}


class LocalStorage {
    public usingStorage: boolean = true;
    public defaultSeller: string = '';
    public companies: Record<string, NewParty | undefined> = {};
    public invoices: Record<string, any | undefined> = {};

    constructor() {
        this.load();
    }

    private load() {
        if (typeof window === 'undefined') {
            return;
        }

        this.usingStorage = getLocalStorage(localKeys.usingStorage, true);
        this.defaultSeller = getLocalStorage(localKeys.defaultSeller, '');
        this.invoices = getAllLocalStorage(localKeys.invoice);
        this.companies = getAllLocalStorage(localKeys.company);
    }

    public set<V = any>(
        key: LocalStorageKey,
        value: V,
    ) {
        if (!this.usingStorage && key !== localKeys.usingStorage) {
            return;
        }

        setLocalStorage(key, value);
    }

    public obliterate() {
        deleteLocalStorage(localKeys.defaultSeller);
        deleteAllLocalStorage(localKeys.company);
        deleteAllLocalStorage(localKeys.invoice);

        this.defaultSeller = '';
        this.companies = {};
        this.invoices = {};
    }
}


const localStorageEntity = new LocalStorage();


export default localStorageEntity;
