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
    InvoiceLine,
} from '../data';

import webContainerRunner from '../logic/node-php';

import {
    downloadTextFile,
    getDateFormat,
} from '../logic/utilities';



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
    ] = useState({
        number: '',
        currency: 'RON',
        issueDate: Date.now(),
        dueDate: Date.now(),
    });

    const emptyLine = {
        name: '',
        price: 100,
        quantity: 1,
        vatRate: 19,
    };

    const [
        lines,
        setLines,
    ] = useState<InvoiceLine[]>([{
        ...emptyLine,
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
            emptyLine,
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
                subdivision: seller.county,
            },
            buyer: {
                ...buyer,
                subdivision: buyer.county,
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


    return (
        <div
            className="m-auto max-w-7xl z-0"
        >
            {!loadedWebContainers && (
                <Spinner />
            )}

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


            <Menu />


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
            />

            <div
                className="grid place-content-center p-8"
            >
                <button
                    onClick={() => addNewLine()}
                    className="select-none focus:outline-none focus:ring-2 focus:ring-white"
                >
                    adăugare produs
                </button>
            </div>


            <div
                className="grid place-content-center p-8"
            >
                <button
                    onClick={() => generateEinvoice()}
                    className="select-none bg-gray-600 hover:bg-gray-800 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white"
                >
                    generare efactura
                </button>
            </div>


            <div
                className="grid place-content-center p-8"
            >
                <Deleter
                    title="xfactură nouă"
                    atDelete={() => {}}
                />
            </div>


            <div
                className="mb-8"
            />
        </div>
    );
}
