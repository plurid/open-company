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

import {
    newParty,
    NewParty,
    emptyInvoiceLine,
    InvoiceLine,
    emptyMetadata,
    Metadata,
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
    const mounted = useRef(false);


    const [
        loadedWebContainers,
        setLoadedWebContainers,
    ] = useState(false);

    const [
        isMobile,
        setIsMobile,
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


    const updateMetadata = (
        type: any,
        value: string | number,
    ) => {
        setMetadata(prevValues => ({
            ...prevValues,
            [type]: value,
        }));
    }

    const updateDate = (
        kind: 'issueDate' | 'dueDate',
        value: string,
    ) => {
        const split = value.split('/');
        const day = split[0];
        const month = split[1];
        const year = split[2];
        const timestamp = Date.parse(
            `${year}-${month}-${day}`,
        );
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


    useEffect(() => {
        if (mounted.current) {
            return;
        }
        mounted.current = true;

        webContainerRunner.load()
            .then((loaded) => {
                setLoadedWebContainers(true);

                if (!loaded) {
                    // TODO
                    // notify error
                }
            });
    }, []);


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

    useEffect(() => {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            const isMobile = true;
            setIsMobile(isMobile);
        }
    }, []);


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
                        className="grid justify-center items-center text-center"
                    >
                        <button
                            className="cursor-pointer select-none mb-4 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            încărcare factură
                            <br/>
                            <span
                                className="text-xs"
                            >
                                jpg/png/pdf/docx/xlsx/xml/json
                            </span>
                        </button>

                        {isMobile && (
                            <div
                                className="cursor-pointer select-none mb-4"
                            >
                                fotografiere factură
                            </div>
                        )}
                    </div>
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

                    <Input
                        text="dată emitere"
                        value={new Date(metadata.issueDate).toLocaleDateString()}
                        setValue={(value) => updateDate('issueDate', value)}
                    />

                    <Input
                        text="dată scadență"
                        value={new Date(metadata.dueDate).toLocaleDateString()}
                        setValue={(value) => updateDate('dueDate', value)}
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
