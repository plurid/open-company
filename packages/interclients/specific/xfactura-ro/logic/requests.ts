import {
    ENVIRONMENT,
    COMPANY_DETAILS_API,
} from '../data';

import {
    logger,
} from './utilities';



export const getCompanyDetails = async (
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
}
