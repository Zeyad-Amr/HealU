import { NextFunction, Request, Response } from 'express';

/**
 * @name asyncErrorCatching
 * @description This function is used to catch errors in async functions
 * @param fn - the async function to be wrapped
 * @returns {(function(*, *, *): void)|*}
 */

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const asyncErrorCatching = (fn : AsyncFunction)  => {
    // return the function if no error, else catch the error and pass it to the next middleware
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
}

// export the asyncErrorCatching function
export default asyncErrorCatching;