'use strict';

import { Response, Request, NextFunction } from 'express';
import DB from '../config/db';
import Error from '../models/Error/Error.model';
import { ErrorCode } from '../models/Error/ErrorEnumTypes';
// import * as ItemService from '../services/Item.service';

/**
 * GET /api
 * List of API examples.
 */
export const getApi = (req: Request, res: Response) => {
    res.send(req.params.id);
};

// export const addTestItem = async (req: Request, res: Response) => {
//     const result = await ItemService.addItem(req.body);
//     res.status(200).json(result);
// };

// export const getTestItem = async (req: Request, res: Response) => {
//     const id = parseInt(req.params.id);
//     const result = await ItemService.getItem(id);

//     if (result) {
//         res.status(200).json(result);
//     } else {
//         res.status(404).json(new Error(ErrorCode.NOT_FOUND, 404, `Not found item of id=${id}`));
//     }
// };
