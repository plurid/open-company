import type {
    NextApiRequest,
    NextApiResponse,
} from 'next';

import {
    ResponseData,
} from '../../data';

import {
    normalizeVatNumber,
} from '../../logic/validation';

import {
    logger,
} from '../../logic/utilities';



const API = 'https://webservicesp.anaf.ro/PlatitorTvaRest/api/v8/ws/tva';

const map: Record<string, Record<string, any>> = {};
const MAP_LIMIT = 10_000;

type RequestBody = {
    vatNumber: string;
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {
        const data: RequestBody = JSON.parse(req.body);
        const {
            vatNumber,
        } = data;
        const normalizedVatNumber = normalizeVatNumber(vatNumber);
        if (
            !normalizedVatNumber
            || normalizedVatNumber.length < 5
            || normalizedVatNumber.length > 12
        ) {
            res.status(400).json({
                status: false,
            });
            return;
        }

        if (map[vatNumber]) {
            res.status(200).json({
                status: true,
                data: map[vatNumber],
            });
            return;
        }

        const keys = Object.keys(map);
        if (keys.length > MAP_LIMIT) {
            for (const key of keys) {
                delete map[key];
            }
        }

        const result = await fetch(API, {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([
                {
                    cui: normalizedVatNumber,
                    data: new Date().toISOString().split('T')[0],
                },
            ]),
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            .catch((error) => {
                logger('error', error);
            });

        if (result.cod !== 200) {
            res.status(404).json({
                status: false,
            });
        }

        const entity = result.found[0];
        map[vatNumber] = entity;
        res.status(200).json({
            status: true,
            data: entity,
        });
    } catch (error) {
        logger('error', error);

        res.status(400).json({
            status: false,
        });
    }
}
