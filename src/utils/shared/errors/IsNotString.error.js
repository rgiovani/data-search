export default class IsNotStringError extends Error {
    constructor(type = "RuntimeError", ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IsNotStringError);
        }
        this.name = 'IS_NOT_STRING';
        this.description = 'Value cannot be different from type String.';
        this.type = type;
        this.date = new Date();
    }
}