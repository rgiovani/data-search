export default class NotAllowedParameterError extends Error {
    constructor(field, ...params) {
        super(field, ...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotAllowedParameterError);
        }
        this.name = 'NOT_ALLOWED_PARAMETER_ERROR';
        this.description = description(`${field} cannot be null, undefined or different from `, params, `type`);

        this.type = 'RuntimeError';
        this.date = new Date();
    }
}

function description(text, param) {
    for (let i = 0; i < param.length; i++) {
        if (param[i] && i == 0) {
            text = text.concat(param[i]);
        } else {
            text = text.concat(' or ');
            text = text.concat(param[i]);
        }
    }
    text = text.concat('.');
    return text;
}