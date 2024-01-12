import {
    Dispatch,
    SetStateAction,
} from 'react';

import {
    AudioRecorder,
    useAudioRecorder,
} from 'react-audio-voice-recorder';



export default function Audio({
    setShowMicrophone,
    addAudioElement,
} : {
    setShowMicrophone: Dispatch<SetStateAction<boolean>>;
    addAudioElement: (blob: Blob) => void;
}) {
    const recorderControls = useAudioRecorder();


    return (
        <div
            className="flex justify-center items-center"
        >
            <AudioRecorder
                onRecordingComplete={(blob) => {
                    setShowMicrophone(false);
                    addAudioElement(blob);
                }}
                recorderControls={recorderControls}
                audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                }}
            />
        </div>
    );
}
