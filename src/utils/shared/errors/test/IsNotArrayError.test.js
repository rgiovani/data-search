const dataset = require("../../../../../index.js");
const validate = require("../../functions/validateTypes.js");
const { IsNotArrayError } = require("../IsNotArray.error.js");

const main = {
    array: [],
    attributes: []
}

describe("Validating \'array\' with different array type. ", () => {
    test("it should throw that \'array\' cannot be object type", () => {
        main.array = [{ id: 1 }];
        expect(validate.objectInArrayContainsId(main.array)).toBe(main.array);
    });

    test("it should throw that \'array\' cannot be object with message \'array\'", () => {
        main.array = {}
        dataset.dataSetGenerate(main)
        return expect(Promise.reject(new IsNotArrayError('array')))
            .rejects.toThrow('array');

    });
    test("it should throw that \'array\' cannot be object with message \'value\'", () => {
        dataset.dataSetGenerate(main)
        return expect(Promise.reject(new IsNotArrayError()))
            .rejects.toThrow('');

    });
});

describe("Validating \'attributes\' with different array type. ", () => {
    test("it should throw that \'attributes\' cannot be object", () => {
        main.array = [];
        main.attributes = {};
        dataset.dataSetGenerate(main)
        return expect(Promise.reject(new IsNotArrayError('attributes')))
            .rejects.toThrow('attributes');

    });

    test("it should throw that \'main.array\' cannot be differente from array type.", () => {
        main.attributes = [];
        main.array = {};
        return expect(Promise.reject(new IsNotArrayError('main.array')))
            .rejects.toThrow(validate.objectInArrayContainsId(main.array));
    });

});