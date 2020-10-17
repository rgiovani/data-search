import { dataSetGenerate } from '../../../../../index.js'
import IsNotStringError from '../IsNotString.error.js'

const main = {
    array: [],
    attributes: []

}

describe("Validating IsNotString", () => {
    test("it should throw that \'attributes\' cannot be object type", () => {
        main.attributes = [{}]
        dataSetGenerate(main);
        return expect(Promise.reject(new IsNotStringError()))
            .rejects.toThrow();
    })

    test("it should throw that \'attributes\' cannot be number type", () => {
        main.attributes = [1]
        dataSetGenerate(main);
        return expect(Promise.reject(new IsNotStringError()))
            .rejects.toThrow();
    })

    test("it should throw that \'attributes\' cannot be array type", () => {
        main.attributes = [
            []
        ]
        dataSetGenerate(main);
        return expect(Promise.reject(new IsNotStringError()))
            .rejects.toThrow();
    })

    test("it should throw that \'attributes\' cannot be boolean type", () => {
        main.attributes = [true]
        dataSetGenerate(main);
        return expect(Promise.reject(new IsNotStringError()))
            .rejects.toThrow();
    })

    test("it should throw that \'nameId\' cannot be number type", () => {
        main.array = [];
        main.attributes = [];
        main.nameId = 1;

        dataSetGenerate(main);
        return expect(Promise.reject(new IsNotStringError()))
            .rejects.toThrow();
    })

    test("it should throw that \'nameId\' cannot be boolean type", () => {
        main.nameId = true;

        dataSetGenerate(main);
        return expect(Promise.reject(new IsNotStringError()))
            .rejects.toThrow();
    })

    test("it should throw that \'nameId\' cannot be array type", () => {
        main.nameId = [];

        dataSetGenerate(main);
        return expect(Promise.reject(new IsNotStringError()))
            .rejects.toThrow();
    })

    test("it should throw that \'nameId\' cannot be object type", () => {
        main.nameId = {};

        dataSetGenerate(main);
        return expect(Promise.reject(new IsNotStringError()))
            .rejects.toThrow();
    })

})