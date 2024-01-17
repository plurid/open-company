import {
    useState,
} from 'react';

import MenuBack from '../../components/MenuBack';



export default function CompaniesList({
    back,
} : {
    back: () => void;
}) {
    const [
        companies,
        setCompanies,
    ] = useState<any[]>([]);


    return (
        <div>
            <h1
                className="text-center mb-8"
            >
                companii
            </h1>

            {companies.length === 0 && (
                <div>
                    nici o companie
                </div>
            )}

            <MenuBack
                back={back}
            />
        </div>
    );
}
