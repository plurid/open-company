import {
    useRef,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';

import LinkButton from '../../components/LinkButton';
import Tooltip from '../../components/Tooltip';
import ActsModal from '../../components/ActsModal';

import {
    acceptedInvoiceFiles,
} from '../../data';

import {
    uploadIcon,
    photoIcon,
    microphoneIcon,
} from '../../data/icons';



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


    const [
        showActsModal,
        setShowActsModal,
    ] = useState(false);
    const [
        actsModalType,
        setActsModalType,
    ] = useState('');
    const [
        actsModalTitle,
        setActsModalTitle,
    ] = useState('');
    const [
        actsModalDescription,
        setActsModalDescription,
    ] = useState('');


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

    const actsModalAction = (
        kind: 'local' | 'cloud',
    ) => {
        setShowActsModal(false);

        switch (actsModalType) {
            case 'camera':
                if (kind === 'local') {
                    setShowCamera(true);
                } else {
                    setShowCamera(true);
                }
                break;
            default:
                break;
        }

        setActsModalType('');
        setActsModalTitle('');
        setActsModalDescription('');
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
                        {uploadIcon}

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
                                {photoIcon}

                                <LinkButton
                                    text="fotografiere"
                                    onClick={() => {
                                        setShowActsModal(true);
                                        setActsModalType('camera');
                                        setActsModalTitle('fotografiere');
                                        setActsModalDescription('folosește camera pentru a fotografia factura și a detecta automat datele');
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
                                {microphoneIcon}

                                <LinkButton
                                    text="înregistrare"
                                    onClick={() => setShowMicrophone(show => !show)}
                                />
                            </div>
                        </Tooltip>
                    </div>
                </>
            )}

            {showActsModal && (
                <ActsModal
                    title={actsModalTitle}
                    description={actsModalDescription}
                    action={(kind) => {
                        actsModalAction(kind);
                    }}
                    back={() => {
                        setShowActsModal(false);
                    }}
                />
            )}
        </div>
    );
}
