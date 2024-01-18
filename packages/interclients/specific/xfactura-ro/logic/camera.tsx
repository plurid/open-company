import { createWorker } from 'tesseract.js';

import {
    uploadFile,
} from '../logic/requests';



export const logicCamera = async (
    dataURI: string,
) => {
    // console.log(dataURI);
    const dataPart = dataURI.split(',')[1];
    const decodedData = atob(dataPart);

    const byteNumbers = new Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
        byteNumbers[i] = decodedData.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    const data = await uploadFile(blob);
    // console.log(data);


    // console.log(blob);

    // // const blobUrl = URL.createObjectURL(blob);

    // const worker = await createWorker('ron');
    // // const ret = await worker.recognize(blobUrl);
    // const ret = await worker.recognize(blob);
    // console.log(ret.data);
    // // debugRef.current!.innerHTML = JSON.stringify(ret.data.blocks, null, 2);

    // await worker.terminate();
    // // URL.revokeObjectURL(blobUrl);
    // // setDebugSrc(blobUrl);
}
