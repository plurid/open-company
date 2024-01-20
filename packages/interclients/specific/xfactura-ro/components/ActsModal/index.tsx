import {
    useState,
} from 'react';

import {
    useGoogleLogin,
    TokenResponse as GoogleTokenResponse,
} from '@react-oauth/google';

import localStorage from '../../data/localStorage';

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
    // #region state
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
    // #endregion state


    // #region handlers
    const googleSuccessLogin = (
        tokenResponse: Omit<GoogleTokenResponse, "error" | "error_description" | "error_uri">,
    ) => {
        console.log({
            tokenResponse,
        });

        setLoggedIn(true);
        setShowBuyScreen(true);
        setShowLoginScreen(false);
    }
    const googleErrorLogin = () => {
        console.log('Login Failed');
    }
    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => googleSuccessLogin(tokenResponse),
        onError: () => googleErrorLogin(),
    });


    const appleSuccessLogin = () => {
        setLoggedIn(true);
        setShowBuyScreen(true);
        setShowLoginScreen(false);
    }
    const appleErrorLogin = () => {
        console.log('Login Failed');
    }
    // #endregion handlers


    // #region render
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

            {localStorage.usingStorage ? (
                <div>
                    datele sunt stocate doar local
                </div>
            ) : (
                <div>
                    datele nu sunt stocate nici local, nici în cloud
                </div>
            )}
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
                complet gratuit
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
                            folosire modele neuronale în cloud-ul xfactura.ro, timpul de încărcare și de procesare este scurt, iar rezultatele sunt mult mai precise
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
                text="logare prin Google"
                onClick={() => {
                    googleLogin();
                }}
            />

            <LinkButton
                text="logare prin Apple"
                onClick={() => {
                    appleSuccessLogin();
                }}
            />

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

            <div
                className="max-w-[400px]"
            >
                actele inteligente sunt folosite pentru procesarea documentelor în cloud-ul xfactura.ro
                <br />
                datele nu sunt stocate
                <br />
                1 act inteligent = 1 document procesat
            </div>

            <div
                className="font-bold cursor-pointer select-none"
            >
                <div>
                    70 RON
                </div>

                <div>
                    300 acte inteligente
                </div>
            </div>

            <div
                className="font-bold cursor-pointer select-none"
            >
                <div>
                    150 RON
                </div>

                <div>
                    1.000 acte inteligente
                </div>
            </div>

            <div
                className="font-bold cursor-pointer select-none"
            >
                <div>
                    500 RON
                </div>

                <div>
                    5.000 acte inteligente
                </div>
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
            className={`
                w-full h-full
                backdrop-blur-md
                fixed top-0 right-0 bottom-0 z-30
                grid items-center justify-center place-content-center gap-12
            `}
        >
            {screen}
        </div>
    );
    // #endregion render
}
