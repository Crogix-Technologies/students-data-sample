import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../Utils/error';
import { logger } from '../Utils/logger';

// Global error handler
export const errorHandler = (err: CustomError | Error, req: Request, 
                             res: Response, next: NextFunction) => {
    //if custom error exists send the error json as response
    if (err instanceof CustomError) {
        console.log(err.HttpStatusCode)
        return res.status(err.HttpStatusCode).json(err.JSON);
    }
    //log the system error and send and nice messge to user
    logger.error("some thing went wrong that is unhandled " + err.message + err.stack)

    return res.status(500).json({ status: 500, message: "some thing went wrong try again", success: false, });
};