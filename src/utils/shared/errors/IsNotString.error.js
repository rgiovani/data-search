export default class IsNotStringError extends Error {
    constructor(attribute = 'Value') {
        super(attribute);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IsNotStringError);
        }
        this.name = 'IS_NOT_STRING';
        this.description = `${attribute} cannot be different from string type.`;
        this.type = 'RuntimeError';
        this.date = new Date();
    }
}