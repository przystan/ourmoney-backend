"use strict";

import { Response, Request, NextFunction } from "express";


/**
 * GET /api
 * List of API examples.
 */
export const getApi = (req: Request, res: Response) => {
   res.send("sss");
};
