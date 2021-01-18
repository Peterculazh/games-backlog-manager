export enum ERROR_CODE {
    E1 = "Not full data"

}

export interface ERROR {
    code: ERROR_CODE, message: string
}


export default class CustomError extends Error {

    public code: ERROR_CODE;
    public error_message: string;

    constructor(error: ERROR, message: string = "", ...args: any[]) {
        super(...args);
        this.message = message;
        this.code = error.code;
        this.error_message = error.message;
    }

}