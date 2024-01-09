import {
    useState,
} from 'react';



export default function Deleter({
    title,
    atDelete,
}: {
    atDelete: () => void,
    title?: string,
}) {
    const [
        showDelete,
        setShowDelete,
    ] = useState(false);


    if (showDelete) {
        return (
            <div
                className="select-none flex gap-4 items-center justify-center text-center min-w-[90px] min-h-[25px]"
            >
                <button
                    onClick={() => atDelete()}
                    className="focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30"
                        className="cursor-pointer"
                        style={{
                            filter: 'invert(1)', width: '20px', height: '20px',
                        }}
                    >
                        <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z">
                            {/* check */}
                        </path>
                    </svg>
                </button>

                <button
                    onClick={() => setShowDelete(false)}
                    className="focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"
                        className="cursor-pointer"
                        style={{
                            filter: 'invert(1)', width: '20px', height: '20px',
                        }}
                    >
                        <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z">
                            {/* close */}
                        </path>
                    </svg>
                </button>
            </div>
        );
    }

    return (
        <div
            className="select-none flex gap-4 items-center justify-center text-center min-w-[90px] min-h-[25px]"
        >
            <button
                onClick={() => setShowDelete(true)}
                className="focus:outline-none focus:ring-2 focus:ring-white"
            >
                {title || 'ștergere'}
            </button>
        </div>
    );
}
