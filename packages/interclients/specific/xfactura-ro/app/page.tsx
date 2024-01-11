'use client';

import {
    useState,
    useRef,
    useEffect,
} from 'react';

import Menu from '../components/Menu';
import Party from '../components/Party';
import Lines from '../components/Lines';
import Spinner from '../components/Spinner';
import Deleter from '../components/Deleter';

import Title from '../containers/Title';
import Extractors from '../containers/Extractors';
import MetadataComponent from '../containers/Metadata';
import Camera from '../containers/Camera';
import Audio from '../containers/Audio';

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
    // #region references
    const mounted = useRef(false);
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
        showMicrophone,
        setShowMicrophone,
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
    const addAudioElement = (
        blob: Blob,
    ) => {
        // const url = URL.createObjectURL(blob);
        // const audio = document.createElement('audio');
        // audio.src = url;
        // audio.controls = true;
        // document.body.appendChild(audio);
    };

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

        webContainerRunner.load()
            .then((loaded) => {
                setLoadedWebContainers(true);

                if (!loaded) {
                    // TODO
                    // notify error
                }
            });
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
                    <Title />

                    <Extractors
                        hasMediaDevices={hasMediaDevices}
                        setShowCamera={setShowCamera}
                        setShowMicrophone={setShowMicrophone}
                    />

                    {showCamera && (
                        <Camera
                            handlePhoto={handleInvoicePhoto}
                            back={() => setShowCamera(false)}
                        />
                    )}

                    {showMicrophone && (
                        <Audio
                            setShowMicrophone={setShowMicrophone}
                            addAudioElement={addAudioElement}
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


                <MetadataComponent
                    metadata={metadata}
                    updateMetadata={updateMetadata}
                    updateDate={updateDate}
                />


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
