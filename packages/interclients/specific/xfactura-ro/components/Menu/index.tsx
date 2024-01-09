import {
    useState,
    useEffect,
} from 'react';

import Link from 'next/link';



export const MenuIcon = ({
    show,
    atClick,
}: {
    show: boolean,
    atClick: () => void,
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"
        className="z-50 fixed top-0 right-0 m-4 cursor-pointer"
        style={{
            filter: 'invert(1)', width: '30px', height: '30px',
        }}
        onClick={atClick}
    >
        {show ? (
            // Close
            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
        ) : (
            // Hamburger
            <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
        )}
    </svg>
);



export default function Menu() {
    const [
        showMenu,
        setShowMenu,
    ] = useState(false);

    const [
        showAbout,
        setShowAbout,
    ] = useState(false);


    useEffect(() => {
        setShowAbout(false);
    }, [
        showMenu,
    ]);


    return (
        <div>
            <MenuIcon
                show={showMenu}
                atClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
                <div
                    className="fixed z-40 top-0 h-screen right-0 left-0 botom-0 backdrop-blur-md grid place-items-center text-center"
                >
                    {showAbout && (
                        <div
                            className="max-w-xl p-4 text-left"
                        >
                            <p>
                                xfactura.ro este un proiect <a
                                    href="https://github.com/plurid/open-company/tree/master/packages/interclients/specific/xfactura-ro"
                                    target="_blank"
                                >
                                    open source
                                </a>
                            </p>

                            <p>
                                xfactura.ro nu este asociat cu nicio instituție
                            </p>

                            <p>
                                xfactura.ro rulează complet local în browser și nu stochează datele în nicio bază de date externă
                                <br />
                                toate datele sunt stocate folosind localStorage
                                <br />
                                datele pot fi exportate și importate în format JSON
                            </p>

                            <p>
                                xfactura.ro poate fi rulat pe propriul calculator folosind <a
                                    href="https://github.com/plurid/open-company/tree/master/packages/interclients/specific/xfactura-ro"
                                    target="_blank"
                                >
                                    docker
                                </a>
                            </p>

                            <p>
                                xfactura.ro poate fi susținut prin <a
                                    href="https://buy.stripe.com/aEU5nj6Pma6Va6A3ch"
                                    target="_blank"
                                >
                                    stripe
                                </a>
                            </p>

                            <div
                                className="mt-8 flex justify-center"
                            >
                                <div
                                    className="cursor-pointer text-center inline"
                                    onClick={() => setShowAbout(false)}
                                >
                                    înapoi
                                </div>
                            </div>
                        </div>
                    )}

                    {!showAbout && (
                        <ul>
                            <li className="m-4">
                                <Link
                                    href="/"
                                    onClick={() => setShowMenu(false)}
                                >
                                    xfactură nouă
                                </Link>
                            </li>
                            <li className="m-4">
                                <div
                                    onClick={() => setShowAbout(true)}
                                    className="cursor-pointer"
                                >
                                    despre xfactura.ro
                                </div>
                            </li>
                            <li className="m-4">
                                <Link href="/xfacturi">xfacturi</Link>
                            </li>
                            <li className="m-4">
                                <Link href="/setari">setări</Link>
                            </li>
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
