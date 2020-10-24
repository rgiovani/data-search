class IsNotArrayError extends Error {
    constructor(attribute = 'Value') {
        super(attribute);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IsNotArrayError);
        }
        this.name = 'IS_NOT_ARRAY';
        this.description = `${attribute} cannot be different from array type.`;
        this.type = 'RuntimeError';
        this.date = new Date();

    }
}

module.exports = { IsNotArrayError };