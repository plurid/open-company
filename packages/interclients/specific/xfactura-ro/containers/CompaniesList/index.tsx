import {
    useState,
} from 'react';

import {
    NewParty,
} from '../../data';

import localStorage from '../../data/localStorage';

import MenuBack from '../../components/MenuBack';



export default function CompaniesList({
    back,
} : {
    back: () => void;
}) {
    const [
        companies,
        setCompanies,
    ] = useState<NewParty[]>(
        Object.values(localStorage.companies) as NewParty[],
    );


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

            {companies.map(company => {
                return (
                    <div
                        key={company.vatNumber}
                        className="flex justify-between items-center gap-4 p-2 mb-2 w-full"
                    >
                        <div>
                            {company.vatNumber}
                        </div>

                        <div>
                            {company.name}
                        </div>
                    </div>
                );
            })}

            <MenuBack
                back={back}
            />
        </div>
    );
}
