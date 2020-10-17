import { dataSetGenerate } from '../../../../../index.js';
import IsNotNumberError from '../IsNotNumber.error.js'

describe("Validating field \'wordSize\'. ", () => {
    test("it should throw that \'wordSize\' cannot be string", () => {
        const main = { array: [], wordSize: '' }
        dataSetGenerate(main)
        return expect(Promise.reject(new IsNotNumberError('wordSize'))).rejects.toThrow();

    });

    test("it should throw that \'wordSize\' cannot be object", () => {
        const main = { array: [], wordSize: {} }
        dataSetGenerate(main)
        return expect(Promise.reject(new IsNotNumberError('wordSize'))).rejects.toThrow();

    });

    test("it should throw that \'wordSize\' cannot be boolean", () => {
        const main = { array: [], wordSize: true }
        dataSetGenerate(main)
        return expect(Promise.reject(new IsNotNumberError('wordSize'))).rejects.toThrow();

    });

    test("it should throw that value cannot be boolean", () => {
        const main = { array: [], wordSize: true }
        dataSetGenerate(main)
        return expect(Promise.reject(new IsNotNumberError())).rejects.toThrow();

    });
});