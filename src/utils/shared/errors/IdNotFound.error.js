class IdNotFoundError extends Error {
    constructor() {
        super();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IdNotFoundError);
        }

        this.name = 'ID_NOT_FOUND';
        this.description = 'Object doesn\'t have ID field.';
        this.type = 'RuntimeError';
        this.date = new Date();
    }
}

module.exports = { IdNotFoundError };