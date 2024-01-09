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
        <div>
            {!loadedWebContainers && (
                <Spinner />
            )}

            <h1
                className="text-2xl text-center m-4 pb-8"
            >
                xfactura.ro
            </h1>

            <Menu />

            <div
                className="grid md:flex"
            >
                <div
                    className="w-full md:w-1/2 h-[300px]"
                >
                    <h1>
                        furnizor
                    </h1>

                    <Party
                        kind="seller"
                        data={seller}
                        setParty={setSeller}
                    />
                </div>

                <div
                    className="w-full md:w-1/2 h-[300px]"
                >
                    <h2>
                        cumpărător
                    </h2>

                    <Party
                        kind="buyer"
                        data={buyer}
                        setParty={setBuyer}
                    />
                </div>
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

            <div>
                <Lines
                    data={lines}
                    setLines={setLines}
                />
            </div>

            <div
                className="grid place-content-center p-8"
            >
                <button
                    onClick={() => addNewLine()}
                >
                    adăugare produs
                </button>
            </div>

            <div
                className="grid place-content-center p-8"
            >
                <button
                    onClick={() => generateEinvoice()}
                >
                    generare efactura
                </button>
            </div>
        </div>
    );
}
