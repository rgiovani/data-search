import { dataSetGenerate } from '../../../../../index.js';
import { objectInArrayContainsId } from '../../functions/validateTypes.js';
import IsNotObjectError from '../IsNotObject.error.js';

describe("Validating \'main\'. ", () => {
    test("it should throw that \'main\' cannot be array", () => {
        const main = [];
        return expect(Promise.reject(new IsNotObjectError('main')))
            .rejects.toThrow(dataSetGenerate(main));
    });

    test("it should throw that \'main\' cannot be number", () => {
        const main = 1;
        return expect(Promise.reject(new IsNotObjectError('main')))
            .rejects.toThrow(dataSetGenerate(main));
    });

    test("it should throw that \'main\' cannot be string", () => {
        const main = 'foo';
        return expect(Promise.reject(new IsNotObjectError('main'))).rejects.toThrow(dataSetGenerate(main));
    });

});

describe("Validating values inside attribute \'array\' in main object", () => {
    test("it should throw that \'value\' inside \'array\' cannot be string", () => {
        const main = {
            array: ['']
        };

        return expect(Promise.reject(new IsNotObjectError()))
            .rejects.toThrow(objectInArrayContainsId(main.array));
    });
    test("it should throw that \'value\' inside \'array\' cannot be boolean", () => {
        const main = {
            array: [true]
        };

        return expect(Promise.reject(new IsNotObjectError()))
            .rejects.toThrow(objectInArrayContainsId(main.array));
    });
    test("it should throw that \'value\' inside \'array\' cannot be string", () => {
        const main = {
            array: [1]
        };

        return expect(Promise.reject(new IsNotObjectError()))
            .rejects.toThrow(objectInArrayContainsId(main.array));
    });

    test("it should return array with an object inside", () => {
        const main = {
            array: [{ id: 1 }]
        };
        expect(objectInArrayContainsId(main.array)).toBe(main.array);
    });
});