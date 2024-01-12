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
} : {
    hasMediaDevices: boolean;
    setShowCamera: Dispatch<SetStateAction<boolean>>;
    setShowMicrophone: Dispatch<SetStateAction<boolean>>;
}) {
    const configInput = useRef<HTMLInputElement | null>(null);


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


    return (
        <div
            className="grid gap-2 justify-center items-center text-center min-h-[50px] md:flex md:gap-6"
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
                                onClick={() => setShowMicrophone(show => !show)}
                            />
                        </Tooltip>
                    </div>
                </>
            )}
        </div>
    );
}
