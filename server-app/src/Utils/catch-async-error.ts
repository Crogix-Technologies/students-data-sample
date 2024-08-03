
import { NextFunction, Request, Response } from "express";

export const CatchAsyncError = (callback: any) => 
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(callback(req, res, next)).catch(next);
    };
