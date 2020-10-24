const get = require('../../../../main/dataSet/generateDataset.js');
const defaultFunctions = require('../../functions/defaultFunctions.js');
const { NotAllowedParameterError } = require('../NotAllowedParameter.error.js');

describe('Validating NotAllowedParameter', () => {
    test('it should throw that \'dataSet.array\'  cannot be object type', () => {

        get.dataset.array = {};
        return expect(Promise.reject(new NotAllowedParameterError()))
            .rejects.toThrow();
    });

    test('it should throw that \'dataSet.array\' cannot be number type', () => {
        get.dataset.array = 1;
        return expect(Promise.reject(new NotAllowedParameterError()))
            .rejects.toThrow();
    });

    test('it should throw that \'dataSet.array\'  cannot be string type', () => {

        get.dataset.array = 1;
        return expect(Promise.reject(new NotAllowedParameterError()))
            .rejects.toThrow();
    });

    test('it should throw that \'treatString\' function do not have correct parameters', () => {

        defaultFunctions.treatString(1, 2, 3);
        return expect(Promise.reject(new NotAllowedParameterError('text', 'string', 'boolean')))
            .rejects.toThrow();
    });
})