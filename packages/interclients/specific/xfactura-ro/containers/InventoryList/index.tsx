import {
    useState,
} from 'react';

import {
    NewParty,
} from '../../data';

import localStorage from '../../data/localStorage';

import MenuBack from '../../components/MenuBack';



export default function InventoryList({
    back,
} : {
    back: () => void;
}) {
    const [
        inventory,
        setInventory,
    ] = useState<NewParty[]>(
        Object.values(localStorage.inventory),
    );


    return (
        <div>
            <h1
                className="text-center mb-8"
            >
                stocuri
            </h1>

            {inventory.length === 0 && (
                <div>
                    nici un stoc
                </div>
            )}

            {/* {inventory.map(inventory => {
                return (
                    <div
                        key={inventory.id}
                        className="flex justify-between items-center gap-4 p-2 mb-2 w-full"
                    >
                        <div>
                            {inventory.name}
                        </div>
                    </div>
                );
            })} */}

            <MenuBack
                back={back}
            />
        </div>
    );
}
