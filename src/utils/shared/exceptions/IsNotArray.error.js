class IsNotArrayError extends Error {
    constructor(type = "RuntimeError", ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IsNotArrayError);
        }
        this.name = 'IS_NOT_ARRAY';
        this.description = 'Value cannot be different from type Array.';
        this.type = type;
        this.date = new Date();
    }
}
module.exports = IsNotArrayError;