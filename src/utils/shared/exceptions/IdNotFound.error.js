class IdNotFoundError extends Error {
    constructor(type = "RuntimeError", ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IdNotFoundError);
        }

        this.name = 'ID_NOT_FOUND';
        this.description = 'Object doesn\'t have ID field.';
        this.type = type;
        this.date = new Date();
    }
}
module.exports = IdNotFoundError;