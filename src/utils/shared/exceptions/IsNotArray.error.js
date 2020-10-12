class IsNotArrayError extends Error {
    constructor(type = "RuntimeError", ...params) {
        super(...params);
        params = (params.length == 0) ? ['Value'] : params;

        params.forEach(item => {
            console.log(item)
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, IsNotArrayError);
            }
            this.name = 'IS_NOT_ARRAY';
            this.description = item + ' cannot be different from type Array.';
            this.type = type;
            this.date = new Date();
        })
    }
}

module.exports = IsNotArrayError;