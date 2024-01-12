import {
    useState,
} from 'react';

import localStorage, {
    localKeys,
} from '../../data/localStorage';

import MenuBack from '../../components/MenuBack';
import Deleter from '../../components/Deleter';
import LinkButton from '../../components/LinkButton';
import Toggle from '../../components/Toggle';



export default function Settings({
    back,
} : {
    back: () => void;
}) {
    const [
        useLocalStorage,
        setUseLocalStorage,
    ] = useState(localStorage.usingStorage);


    return (
        <div>
            <h1
                className="text-center mb-8"
            >
                setări
            </h1>

            <div
                className="grid gap-4"
            >
                <Toggle
                    text="stocare date locale"
                    value={useLocalStorage}
                    toggle={() => {
                        setUseLocalStorage(!useLocalStorage);
                        localStorage.set(localKeys.usingStorage, !useLocalStorage);
                        localStorage.usingStorage = !useLocalStorage;
                    }}
                />

                <LinkButton
                    text="export"
                    onClick={() => {}}
                />

                <LinkButton
                    text="import"
                    onClick={() => {}}
                />

                <Deleter
                    title="ștergere totală"
                    atDelete={() => {}}
                />
            </div>

            <MenuBack
                back={back}
            />
        </div>
    );
}
