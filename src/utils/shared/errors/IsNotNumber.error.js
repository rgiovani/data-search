export default class IsNotNumberError extends Error {
    constructor(type = "RuntimeError", ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IsNotNumberError);
        }
        this.name = 'IS_NOT_NUMBER';
        this.description = 'Value cannot be different from type Number.';
        this.type = type;
        this.date = new Date();
    }
}