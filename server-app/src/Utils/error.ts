
export class CustomError extends Error {
    
    private statusCode: number;
    // private errorType: ErrorType;
    // private errors: string[] | null;
    // private errorRaw: any;
    private errorsValidation: ErrorValidation[] | null;

    constructor(
        message: string,
        statusCode: number,
        // errorType: ErrorType,
        // errors: string[] | null = null,
        // errorRaw: any = null,
        errorsValidation: ErrorValidation[] | null = null,

    ) {
        super(message);

        // this.name = this.constructor.name;

        this.statusCode = statusCode || 500;
        // this.errorType = errorType;
        // this.errors = errors;
        // this.errorRaw = errorRaw;
        this.errorsValidation = errorsValidation;
    }

    get HttpStatusCode() {
        return this.statusCode;
    }

    get JSON(): ErrorResponse {
        return {
            // errorType: this.errorType,
            errorMessage: this.message,
            success: false,
            status: this.statusCode,
            // errors: this.errors,
            // errorRaw: this.errorRaw,
            errorsValidation: this.errorsValidation,
        };
    }
}

// Types 
export type ErrorResponse = {
    // errorType: ErrorType;
    status: number
    errorMessage: string;
    success: boolean
    // errors: string[] | null;
    // errorRaw: any;
    errorsValidation: ErrorValidation[] | null;
    stack?: string;
};

export type ErrorType = 'General' | 'Raw' | 'Validation' | 'Unauthorized';

export type ErrorValidation = { [key: string]: string };