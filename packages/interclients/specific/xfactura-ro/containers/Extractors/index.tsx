import {
    useRef,
    Dispatch,
    SetStateAction,
} from 'react';

import LinkButton from '../../components/LinkButton';
import Tooltip from '../../components/Tooltip';

import {
    acceptedInvoiceFiles,
} from '../../data';



export default function Extractors({
    hasMediaDevices,
    setShowCamera,
    setShowMicrophone,
    extractInvoiceFromFile,
} : {
    hasMediaDevices: boolean;
    setShowCamera: Dispatch<SetStateAction<boolean>>;
    setShowMicrophone: Dispatch<SetStateAction<boolean>>;
    extractInvoiceFromFile: (file: File) => void;
}) {
    const configInput = useRef<HTMLInputElement | null>(null);


    const triggerReadInput = () => {
        if (!configInput?.current) {
            return;
        }
        configInput.current.click();
    }

    const handleReadInput = async () => {
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

        extractInvoiceFromFile(file);
    }


    return (
        <div
            className="grid gap-4 justify-center items-center text-center min-h-[50px] md:flex md:gap-6"
            style={{
                justifyItems: 'center',
            }}
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
                    <div
                        className="flex items-center gap-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            style={{
                                width: '25px',
                                height: '25px',
                            }}
                        >
                            <path d="M3 19h18v2H3v-2zM13 5.828V17h-2V5.828L4.929 11.9l-1.414-1.414L12 2l8.485 8.485-1.414 1.414L13 5.83z" fill="white" />
                        </svg>

                        <LinkButton
                            text="încărcare"
                            onClick={() => triggerReadInput()}
                        />
                    </div>
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
                            <div
                                className="flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                    style={{
                                        width: '25px',
                                        height: '25px',
                                    }}
                                >
                                    <rect x="10" y="20" width="80" height="60" stroke="white" strokeWidth={8} />
                                    <circle cx="50" cy="50" r="15" stroke="white" strokeWidth={8} />
                                </svg>

                                <LinkButton
                                    text="fotografiere"
                                    onClick={() => {
                                        setShowCamera(true);
                                    }}
                                />
                            </div>
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
                            <div
                                className="flex items-center gap-1"
                            >
                                <svg
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        width: '25px',
                                        height: '25px',
                                    }}
                                >
                                    <path d="M24,33a8,8,0,0,0,8-8V9A8,8,0,0,0,16,9V25A8,8,0,0,0,24,33ZM20,9a4,4,0,0,1,8,0V25a4,4,0,0,1-8,0Z" fill="white" />
                                    <path d="M38,25a2,2,0,0,0-4,0,10,10,0,0,1-20,0,2,2,0,0,0-4,0A14,14,0,0,0,22,38.84V43H21a2,2,0,0,0,0,4h6a2,2,0,0,0,0-4H26V38.84A14,14,0,0,0,38,25Z" fill="white" />
                                </svg>

                                <LinkButton
                                    text="înregistrare"
                                    onClick={() => setShowMicrophone(show => !show)}
                                />
                            </div>
                        </Tooltip>
                    </div>
                </>
            )}
        </div>
    );
}
