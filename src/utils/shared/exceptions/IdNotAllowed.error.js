class IdNotAllowedError extends Error {
    constructor(type = "RuntimeError", ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IdNotAllowedError);
        }

        this.name = 'ID_NOT_ALLOWED_ERROR';
        this.description = 'ID cannot be null, undefined or different from type string or number.';
        this.type = type;
        this.date = new Date();
    }
}
module.exports = IdNotAllowedError;