class IsNotNumberError extends Error {
    constructor(attribute = 'Value') {
        super(attribute);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IsNotNumberError);
        }
        this.name = 'IS_NOT_NUMBER';
        this.description = `${attribute} cannot be different from number type.`;
        this.type = 'RuntimeError';
        this.date = new Date();
    }
}

module.exports = { IsNotNumberError };