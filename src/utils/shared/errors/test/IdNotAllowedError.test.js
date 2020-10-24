const { IdNotAllowedError } = require("../IdNotAllowed.error.js");
const validate = require("../../functions/validateTypes.js");

describe("Validating IdNotAllowedError. ", () => {
    test("it should throw that \'id\' cannot be array type", () => {
        const myobj = [{ id: [] }]
        return expect(Promise.reject(new IdNotAllowedError())).rejects.toThrow(
            validate.objectInArrayContainsId(myobj),
        );
    });
    test("it should throw \'id\' cannot be object type", () => {
        const myobj = [{ id: {} }]
        return expect(Promise.reject(new IdNotAllowedError())).rejects.toThrow(
            validate.objectInArrayContainsId(myobj),
        );
    });

    test("it should throw \'id\' cannot be boolean type", () => {
        const myobj = [{ id: true }]
        return expect(Promise.reject(new IdNotAllowedError())).rejects.toThrow(
            validate.objectInArrayContainsId(myobj),
        );
    });
});