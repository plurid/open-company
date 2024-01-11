'use client';

import {
    useState,
    useRef,
    useEffect,
} from 'react';


import Menu from '../components/Menu';
import Party from '../components/Party';
import Input from '../components/Input';
import Lines from '../components/Lines';
import Spinner from '../components/Spinner';
import Deleter from '../components/Deleter';
import Datepicker from '../components/Datepicker';
import LinkButton from '../components/LinkButton';
import Tooltip from '../components/Tooltip';

import Camera from '../containers/Camera';

import {
    newParty,
    NewParty,
    emptyInvoiceLine,
    InvoiceLine,
    emptyMetadata,
    Metadata,
    acceptedInvoiceFiles,
} from '../data';

import webContainerRunner from '../logic/node-php';

import {
    downloadTextFile,
    getDateFormat,
} from '../logic/utilities';

import {
    checkValidParty,
    checkValidLine,
    checkValidMetadata,
    normalizedUserCounty,
} from '../logic/validation';



export default function Home() {
    // #region references
    const mounted = useRef(false);
    const configInput = useRef<HTMLInputElement | null>(null);
    // #endregion references


    // #region state
    const [
        loadedWebContainers,
        setLoadedWebContainers,
    ] = useState(false);

    const [
        hasMediaDevices,
        setHasMediaDevices,
    ] = useState(true);

    const [
        showCamera,
        setShowCamera,
    ] = useState(false);

    const [
        validData,
        setValidData,
    ] = useState(false);

    const [
        seller,
        setSeller,
    ] = useState<NewParty>({
        ...newParty,
    });

    const [
        buyer,
        setBuyer,
    ] = useState<NewParty>({
        ...newParty,
    });

    const [
        metadata,
        setMetadata,
    ] = useState<Metadata>({
        ...emptyMetadata,
    });

    const [
        lines,
        setLines,
    ] = useState<InvoiceLine[]>([{
        ...emptyInvoiceLine,
    }]);
    // #endregion state


    // #region handlers
    const triggerReadInput = () => {
        if (!configInput?.current) {
            return;
        }
        configInput.current.click();
    }

    const handleReadInput = () => {
        if (!configInput?.current) {
            return;
        }

        const files = configInput.current.files;
        if (!files) {
            return;
        }

        const file = files[0];
        if (!file) {
            return;
        }

        // console.log(file);
    }

    const updateMetadata = (
        type: keyof Metadata,
        value: string | number,
    ) => {
        setMetadata(prevValues => ({
            ...prevValues,
            [type]: value,
        }));
    }

    const updateDate = (
        kind: 'issueDate' | 'dueDate',
        timestamp: number,
    ) => {
        updateMetadata(kind, timestamp);
    }

    const addNewLine = () => {
        setLines(prevValues => ([
            ...prevValues,
            emptyInvoiceLine,
        ]));
    }

    const generateEinvoice = async () => {
        const invoice = {
            metadata: {
                ...metadata,
                issueDate: getDateFormat(metadata.issueDate),
                dueDate: getDateFormat(metadata.dueDate),
            },
            seller: {
                ...seller,
                subdivision: normalizedUserCounty(seller.county),
            },
            buyer: {
                ...buyer,
                subdivision: normalizedUserCounty(buyer.county),
            },
            lines,
        };

        await webContainerRunner.writeData(invoice);
        await webContainerRunner.startNodePHPServer(
            (value) => {
                const filename = `efactura-${metadata.number}-${seller.name}-${buyer.name}.xml`;

                downloadTextFile(
                    filename,
                    value,
                );
            },
        );
    }

    const handleInvoicePhoto = (
        dataUri: string,
    ) => {
        setShowCamera(false);

        // TODO
        // handle photo
    }

    const resetInvoice = () => {
        setSeller({
            ...newParty,
        });

        setBuyer({
            ...newParty,
        });

        setMetadata({
            ...emptyMetadata,
        });

        setLines([{
            ...emptyInvoiceLine,
        }]);
    }
    // #endregion handlers


    // #region effects
    /** web container */
    useEffect(() => {
        if (mounted.current) {
            return;
        }
        mounted.current = true;

        // webContainerRunner.load()
        //     .then((loaded) => {
                   setLoadedWebContainers(true);

        //         if (!loaded) {
        //             // TODO
        //             // notify error
        //         }
        //     });
    }, []);

    /** valid data */
    useEffect(() => {
        const validSeller = checkValidParty(seller);
        const validBuyer = checkValidParty(buyer);
        const validMetadata = checkValidMetadata(metadata);
        const validLines = lines.every(checkValidLine);

        const validData = (
            validSeller &&
            validBuyer &&
            validMetadata &&
            validLines
        );

        setValidData(validData);
    }, [
        seller,
        buyer,
        metadata,
        lines,
    ]);

    /** media devices */
    useEffect(() => {
        let hasMediaDevices = true;

        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            hasMediaDevices = true;
        } else {
            hasMediaDevices = false;
        }

        setHasMediaDevices(hasMediaDevices);
    }, []);
    // #endregion effects


    return (
        <>
            {!loadedWebContainers && (
                <Spinner />
            )}

            <Menu />

            <div>
                <div
                    className="m-4 pb-4"
                >
                    <h1
                        className="text-2xl text-center mb-4"
                    >
                        xfactura.ro
                    </h1>

                    <div
                        className="grid gap-2 justify-center items-center text-center min-h-[50px] md:flex md:gap-6"
                    >
                        <div
                            className="mb-4"
                        >
                            <input
                                ref={configInput}
                                type="file"
                                accept={acceptedInvoiceFiles}
                                className="hidden"
                                onChange={() => handleReadInput()}
                            />
                            <Tooltip
                                content={(
                                    <>
                                        încarcă fișier cu factura în format
                                        <br />
                                        {acceptedInvoiceFiles.replace(/\./g, ' ')}
                                        <br />
                                        pentru a detecta automat datele
                                    </>
                                )}
                            >
                                <LinkButton
                                    text="încărcare"
                                    onClick={() => triggerReadInput()}
                                />
                            </Tooltip>
                        </div>

                        {hasMediaDevices && (
                            <>
                                <div
                                    className="mb-4"
                                >
                                    <Tooltip
                                        content={(
                                            <>
                                                folosește camera pentru a fotografia factura
                                                <br />
                                                și a detecta automat datele
                                            </>
                                        )}
                                    >
                                        <LinkButton
                                            text="fotografiere"
                                            onClick={() => {
                                                setShowCamera(true);
                                            }}
                                        />
                                    </Tooltip>
                                </div>

                                <div
                                    className="mb-4"
                                >
                                    <Tooltip
                                        content={(
                                            <>
                                                folosește microfonul pentru a dicta factura
                                                <br />
                                                &quot;factură de la ... către ... număr ... dată ... produs unu ...&quot;
                                            </>
                                        )}
                                    >
                                        <LinkButton
                                            text="înregistrare"
                                            onClick={() => {
                                            }}
                                        />
                                    </Tooltip>
                                </div>
                            </>
                        )}
                    </div>

                    {showCamera && (
                        <Camera
                            handlePhoto={handleInvoicePhoto}
                            back={() => setShowCamera(false)}
                        />
                    )}
                </div>


                <div
                    className="grid items-center justify-center md:flex m-auto"
                >
                    <Party
                        kind="seller"
                        title="furnizor"
                        data={seller}
                        setParty={setSeller}
                    />

                    <Party
                        kind="buyer"
                        title="cumpărător"
                        data={buyer}
                        setParty={setBuyer}
                    />
                </div>


                <div
                    className="grid place-content-center p-8"
                >
                    <Input
                        text="număr factură"
                        value={metadata.number}
                        setValue={(value) => updateMetadata('number', value)}
                    />

                    <Input
                        text="monedă"
                        value={metadata.currency}
                        setValue={(value) => updateMetadata('currency', value)}
                    />

                    <Datepicker
                        text="dată emitere"
                        atSelect={(value) => updateDate('issueDate', value)}
                    />

                    <Datepicker
                        text="dată scadență"
                        atSelect={(value) => updateDate('dueDate', value)}
                    />
                </div>


                <Lines
                    data={lines}
                    setLines={setLines}
                    addNewLine={addNewLine}
                />


                <div
                    className="grid place-content-center p-8"
                >
                    <button
                        onClick={() => generateEinvoice()}
                        className="select-none bg-gray-800 disabled:bg-gray-600 hover:bg-gray-900 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white"
                        disabled={!validData}
                    >
                        generare efactura
                    </button>
                </div>


                <div
                    className="grid place-content-center p-8"
                >
                    <Deleter
                        title="xfactură nouă"
                        atDelete={() => resetInvoice()}
                    />
                </div>


                <div
                    className="mb-8"
                />
            </div>
        </>
    );
}
