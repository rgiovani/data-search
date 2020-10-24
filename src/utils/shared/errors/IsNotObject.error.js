class IsNotObjectError extends Error {
    constructor(attribute = 'Value') {
        super(attribute);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, IsNotObjectError);
        }
        this.name = 'IS_NOT_OBJECT';
        this.description = `${attribute} cannot be different from object type.`;
        this.type = attribute;
        this.date = new Date();
    }
}

module.exports = { IsNotObjectError };