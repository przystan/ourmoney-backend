import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
    res.send("HELLO fdsdfs");
    console.log("heroku console log")
};
