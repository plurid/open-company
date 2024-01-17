import {
    useState,
} from 'react';

import localStorage from '../../data/localStorage';

import MenuBack from '../../components/MenuBack';



export default function InvoicesList({
    back,
} : {
    back: () => void;
}) {
    const [
        invoices,
        setInvoices,
    ] = useState<any[]>(
        Object.values(localStorage.invoices) as any[],
    );


    return (
        <div>
            <h1
                className="text-center mb-8"
            >
                xfacturi
            </h1>

            {invoices.length === 0 && (
                <div>
                    nici o xfactură
                </div>
            )}

            <MenuBack
                back={back}
            />
        </div>
    );
}
