export default class IdNotAllowedError extends Error {
    constructor(attribute = "ID") {
        super(attribute);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IdNotAllowedError);
        }

        this.name = 'ID_NOT_ALLOWED_ERROR';
        this.description = `${attribute} cannot be null, undefined or different from string or number type.`;
        this.type = 'RuntimeError';
        this.date = new Date();
    }
}