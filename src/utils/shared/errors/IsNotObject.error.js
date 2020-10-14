export default class IsNotObjectError extends Error {
    constructor(type = "RuntimeError", ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IsNotObjectError);
        }
        this.name = 'IS_NOT_OBJECT';
        this.description = 'Value cannot be different from type Object.';
        this.type = type;
        this.date = new Date();
    }
}