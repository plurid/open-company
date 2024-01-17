import {
    useRef,
    useState,
} from 'react';

import localStorage, {
    localKeys,
} from '../../data/localStorage';

import MenuBack from '../../components/MenuBack';
import Deleter from '../../components/Deleter';
import LinkButton from '../../components/LinkButton';
import Toggle from '../../components/Toggle';

import {
    isObject,
} from '../../logic/validation';

import {
    downloadTextFile,
    defocus,
} from '../../logic/utilities';



export default function Settings({
    back,
} : {
    back: () => void;
}) {
    const importInput = useRef<HTMLInputElement | null>(null);


    const [
        useLocalStorage,
        setUseLocalStorage,
    ] = useState(localStorage.usingStorage);

    const [
        generateEinvoiceLocally,
        setGenerateEinvoiceLocally
    ] = useState(localStorage.generateEinvoiceLocally);


    const exportData = () => {
        const data = {
            exportedAt: Date.now(),
            defaultSeller: localStorage.defaultSeller,
            companies: localStorage.companies,
            invoices: localStorage.invoices,
        };

        const date = new Date().toISOString().split('T')[0];

        downloadTextFile(
            `xfactura-ro-export-${date}.json`,
            JSON.stringify(data, null, 2),
        );
    }

    const triggerImport = () => {
        if (!importInput?.current) {
            return;
        }
        importInput.current.click();
    }

    const handleImport = () => {
        if (!importInput?.current) {
            return;
        }

        const files = importInput.current.files;
        if (!files) {
            return;
        }

        const file = files[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = event.target?.result;
                if (!data) {
                    return;
                }

                const parsedData = JSON.parse(data as string);
                if (!parsedData) {
                    return;
                }

                if (
                    typeof parsedData.defaultSeller === 'string' && parsedData.defaultSeller
                    && isObject(parsedData.companies)
                    && isObject(parsedData.invoices)
                ) {
                    localStorage.loadData({
                        defaultSeller: parsedData.defaultSeller,
                        companies: parsedData.companies,
                        invoices: parsedData.invoices,
                    });

                    setTimeout(() => {
                        // TODO notify
                        location.reload();
                    }, 1_000);
                }
            } catch (error) {
                return;
            }
        };
        reader.readAsText(file);
    }

    const reload = () => {
        setTimeout(() => {
            // TODO notify
            location.reload();
        }, 1_000);
    }


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
                        localStorage.set(localKeys.usingStorage, !localStorage.usingStorage);
                        localStorage.usingStorage = !localStorage.usingStorage;

                        setUseLocalStorage(localStorage.usingStorage);
                    }}
                />

                <Toggle
                    text="generare efactura local"
                    value={generateEinvoiceLocally}
                    toggle={() => {
                        localStorage.set(localKeys.generateEinvoiceLocally, !localStorage.generateEinvoiceLocally);
                        localStorage.generateEinvoiceLocally = !localStorage.generateEinvoiceLocally;

                        setGenerateEinvoiceLocally(localStorage.generateEinvoiceLocally);

                        reload();
                    }}
                    tooltip={(
                        <>
                            <p>
                                dacă această opțiune este activată, efactura se va genera în browser, fără a fi trimisă către serverul xfactura.ro · recomandat în browser-ul Chrome sau Firefox pe desktop
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                }}
                            >
                                dacă această opțiune este dezactivată, efactura se va genera pe serverul xfactura.ro fără a fi stocate datele
                            </p>
                        </>
                    )}
                />

                <LinkButton
                    text="export"
                    onClick={() => {
                        exportData();
                        defocus();
                    }}
                />

                <input
                    ref={importInput}
                    type="file"
                    accept={'.json'}
                    className="hidden"
                    onChange={() => handleImport()}
                />
                <LinkButton
                    text="import"
                    onClick={() => {
                        triggerImport();
                    }}
                />

                <Deleter
                    title="ștergere totală"
                    atDelete={() => {
                        localStorage.obliterate();
                        reload();
                    }}
                />
            </div>

            <MenuBack
                back={back}
            />
        </div>
    );
}
