import {
    useState,
} from 'react';

import MenuBack from '../../components/MenuBack';



export default function InvoicesList({
    back,
} : {
    back: () => void,
}) {
    const [
        invoices,
        setInvoices,
    ] = useState<any[]>([]);


    return (
        <div>
            <h1
                className="text-center"
                style={{
                    marginBottom: '2rem',
                }}
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
