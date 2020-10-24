const dataset = require('../../../index.js');

const main = {
    array: [{
        id: 1,
        type: 'Sports car',
        age: ['2018', '2019']
    }],
    attributes: ['age']
}

describe("Validating datasetGenerate function", () => {
    test('it should return that the return of the \'dataSetGenerate\' function is array type', () => {
        expect(Array.isArray(dataset.dataSetGenerate(main))).toBe(true);
    })
});

describe("Validating set from dataset variable", () => {
    test('it should return that \'2018\' have in tags', () => {
        const res = dataset.dataSetGenerate(main)
        expect(res[0].tags.includes('2018')).toBe(true);
    })
});

describe("Validating \'nameId\' field in main object", () => {
    test('it should throw that the value \'pk\' in \'nameId\' doesn\'t match the object ID field name.', () => {
        main.nameId = 'pk'
        const res = dataset.dataSetGenerate(main)
        return expect(Promise.reject(new Error()))
            .rejects.toThrow();
    })
});