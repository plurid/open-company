import {
    ENVIRONMENT,
    COMPANY_DETAILS_API,
    EINVOICE_API,
    UPLOAD_AUDIO_API,
    UPLOAD_FILE_API,
} from '../data';

import {
    logger,
    debounce,
} from './utilities';



export const getCompanyDetails = debounce(async (
    vatNumber: string,
) => {
    if (!ENVIRONMENT.X_DOMAIN) {
        return;
    }

    return fetch(COMPANY_DETAILS_API, {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            vatNumber,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            logger('error', error);
        });
});


export const getEInvoice = async (
    data: any,
) => {
    if (!ENVIRONMENT.X_DOMAIN) {
        return;
    }

    return fetch(EINVOICE_API, {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            logger('error', error);
        });
}


export const uploadAudio = async (
    audio: Blob,
) => {
    if (!ENVIRONMENT.AI_DOMAIN) {
        return;
    }

    const formData = new FormData();
    formData.append('file', audio, 'audio.mp3');

    return fetch(UPLOAD_AUDIO_API, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            logger('error', error);
        });
}

export const uploadFile = async (
    file: any,
) => {
    if (!ENVIRONMENT.AI_DOMAIN) {
        return;
    }

    const formData = new FormData();
    formData.append('file', file, 'file.png');

    return fetch(UPLOAD_FILE_API, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            logger('error', error);
        });
}
