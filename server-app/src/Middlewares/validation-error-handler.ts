import { RequestHandler } from "express";
import { requestValidators } from "../RequestValidators";
import { CustomError } from "../Utils/error";
import { StatusCodes } from "../../@Types/status-codes";
import { TypeOfKeys } from "../../@Types/custom-types"


const supportedMethods = ["post", "put", "patch", "delete"];

const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
};

const validateRequest = (path: TypeOfKeys<typeof requestValidators>, useJoiError = true): RequestHandler => {
    const requestValidations = requestValidators[path];

    if (!requestValidations) {
        throw new Error(`Request validators not found in the path: ${path}`);
    }

    return (req, res, next) => {
        const method = req.method.toLowerCase();

        if (!supportedMethods.includes(method)) {
            return next();
        }

        const { error, value } = requestValidations.validate(req.body, validationOptions);

        if (error) {
            const customError: CustomError = new CustomError("Invalid request. Please review request and try again.", StatusCodes.BadRequest)
            const joiError: CustomError = new CustomError("Validation", 
                StatusCodes.ValidationError, 
                error.details.map(({ message, type }) => (
                    { 
                        [type]: message.replace(/['"]/g, "") 
                    })));
            return res.status(StatusCodes.ValidationError).json(useJoiError ? joiError : customError);
        }

        // validation successful
        req.body = value;
        return next();
    };
};

export default validateRequest;