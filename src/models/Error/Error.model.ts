import { ErrorCode } from "./ErrorEnumTypes";

export default class Error {
    private errorCode: ErrorCode;
    private status: number;
    private errorMessage: string;

    constructor(code: ErrorCode, status: number, message: string) {
        this.errorCode = code;
        this.errorMessage = message;
        this.status = status;
    }
}