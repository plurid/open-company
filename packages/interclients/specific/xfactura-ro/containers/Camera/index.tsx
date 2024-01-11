import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';



export default function CameraContainer({
    handlePhoto,
    back,
} : {
    handlePhoto: (dataUri: string) => void,
    back: () => void,
}) {
    return (
        <div
            className="bg-black fixed top-0 left-0 right-0 bottom-0 z-50 grid justify-center items-center grid-rows-4"
        >
            <div
                className="row-span-3 bg-blue"
            >
                <Camera
                    onTakePhoto={(dataUri) => {
                        handlePhoto(dataUri);
                    }}
                    idealFacingMode="environment"
                    imageCompression={1}
                    isMaxResolution={true}
                />
            </div>

            <div
                className="flex justify-center m-4"
            >
                <button
                    onClick={() => back()}
                    className=""
                >
                    anulare
                </button>
            </div>
        </div>
    );
}
