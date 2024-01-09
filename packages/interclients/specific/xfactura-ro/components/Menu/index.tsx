import {
    useState,
    useEffect,
} from 'react';

import About from '../../containers/About';
import InvoicesList from '../../containers/InvoicesList';
import Settings from '../../containers/Settings';



export const MenuIcon = ({
    show,
    atClick,
}: {
    show: boolean,
    atClick: () => void,
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"
        className="z-50 fixed top-0 left-0 m-4 cursor-pointer"
        style={{
            filter: 'invert(1)', width: '30px', height: '30px',
        }}
        onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();

            atClick();
        }}
    >
        {show ? (
            <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z">
                {/* close */}
            </path>
        ) : (
            <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z">
                {/* hamburger */}
            </path>
        )}
    </svg>
);


export default function Menu() {
    const [
        showMenu,
        setShowMenu,
    ] = useState(false);

    const [
        view,
        setView,
    ] = useState<'general' | 'about' | 'invoices' | 'settings'>('general');


    useEffect(() => {
        setView('general');
    }, [
        showMenu,
    ]);

    useEffect(() => {
        const handleScroll = (event: Event) => {
            if (showMenu) {
                event.preventDefault();
                event.stopPropagation();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setShowMenu(false);
            }
        }

        if (showMenu) {
            window.addEventListener('scroll', handleScroll, { passive: false });
            window.addEventListener('wheel', handleScroll, { passive: false });
            window.addEventListener('keydown', handleEscape);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('keydown', handleEscape);
        };
    }, [
        showMenu,
    ]);


    let viewElement: JSX.Element | undefined;
    switch (view) {
        case 'about':
            viewElement = (
                <About
                    back={() => setView('general')}
                />
            );
            break;
        case 'invoices':
            viewElement = (
                <InvoicesList
                    back={() => setView('general')}
                />
            );
            break;
        case 'settings':
            viewElement = (
                <Settings
                    back={() => setView('general')}
                />
            );
            break;
        case 'general':
            viewElement = (
                <ul>
                    <li className="m-4">
                        <div
                            onClick={() => setShowMenu(false)}
                            className="cursor-pointer"
                        >
                            xfactură nouă
                        </div>
                    </li>
                    <li className="m-4">
                        <div
                            onClick={() => setView('about')}
                            className="cursor-pointer"
                        >
                            despre xfactura.ro
                        </div>
                    </li>
                    <li className="m-4">
                        <div
                            onClick={() => setView('invoices')}
                            className="cursor-pointer"
                        >
                            xfacturi
                        </div>
                    </li>
                    <li className="m-4">
                        <div
                            onClick={() => setView('settings')}
                            className="cursor-pointer"
                        >
                            setări
                        </div>
                    </li>
                </ul>
            );
            break;
    }

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
                    {viewElement}
                </div>
            )}
        </div>
    );
}
