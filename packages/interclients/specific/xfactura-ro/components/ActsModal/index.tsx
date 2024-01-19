import {
    useState,
} from 'react';

import LinkButton from '../LinkButton';
import Subtitle from '../Subtitle';
import TooltipQuestion from '../TooltipQuestion';



export default function ActsModal({
    title,
    description,
    back,
    action,
} : {
    title: string;
    description: React.ReactNode;
    back: () => void;
    action: (
        type: 'local' | 'cloud',
    ) => void;
}) {
    const [
        loggedIn,
        setLoggedIn,
    ] = useState(false);

    const [
        smartActsLeft,
        setSmartActsLeft,
    ] = useState(false);

    const [
        showLoginScreen,
        setShowLoginScreen,
    ] = useState(false);

    const [
        showBuyScreen,
        setShowBuyScreen,
    ] = useState(false);


    const initialScreen = (
        <>
        <div
            className="grid gap-2 max-w-[350px]"
        >
            <div
                className="m-auto"
            >
                <Subtitle
                    text={title}
                />
            </div>

            <div>
                {description}
            </div>
        </div>

        <div
            className="grid items-center justify-center gap-2"
        >
            <div
                className="flex items-center justify-center gap-2"
            >
                <LinkButton
                    text="procesare locală"
                    onClick={() => {
                        action('local');
                    }}
                />

                <TooltipQuestion
                    content={(
                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            folosire modele neuronale locale, timpul de încărcare și de procesare este mai mare, iar rezultatele sunt mai puțin precise
                        </p>
                    )}
                />
            </div>

            <div
                className="text-sm"
            >
                gratuit
            </div>
        </div>

        <div
            className="grid items-center justify-center gap-2"
        >
            <div
                className="flex items-center justify-center gap-2"
            >
                <LinkButton
                    text="procesare în cloud"
                    onClick={() => {
                        if (!loggedIn) {
                            setShowLoginScreen(true);
                            return;
                        }

                        if (!smartActsLeft) {
                            setShowBuyScreen(true);
                            return;
                        }

                        action('cloud');
                    }}
                />

                <TooltipQuestion
                    content={(
                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            folosire modele neuronale în cloud, timpul de încărcare și de procesare este scurt, iar rezultatele sunt mult mai precise
                        </p>
                    )}
                />
            </div>

            <div
                className="text-sm"
            >
                contra cost
            </div>
        </div>

        <LinkButton
            text="anulare"
            onClick={() => {
                back();
            }}
        />
        </>
    );

    const loginScreen = (
        <>
            <div
                className="m-auto"
            >
                <Subtitle
                    text={"logare"}
                />
            </div>

            <LinkButton
                text="înapoi"
                onClick={() => {
                    setShowLoginScreen(false);
                }}
            />
        </>
    );

    const buyScreen = (
        <>
            <div
                className="m-auto"
            >
                <Subtitle
                    text={"cumpărare acte inteligente"}
                />
            </div>

            <LinkButton
                text="înapoi"
                onClick={() => {
                    setShowBuyScreen(false);
                }}
            />
        </>
    );

    const screen = showLoginScreen ? loginScreen
        : showBuyScreen ? buyScreen
        : initialScreen;

    return (
        <div
            role="status"
            className={`fixed w-full h-full backdrop-blur-md top-0 right-0 bottom-0 z-30 grid items-center justify-center place-content-center gap-12`}
            style={{
            }}
        >
            {screen}
        </div>
    );
}
