import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
    console.log("ss")
    res.send("cxvcvcx")
};
