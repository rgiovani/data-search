import { dataset } from '../../../../../index.js';
import { treatString } from '../../functions/defaultFunctions.js';
import NotAllowedParameterError from '../NotAllowedParameter.error.js'

describe('Validating NotAllowedParameter', () => {
    test('it should throw that \'dataSet.array\'  cannot be object type', () => {
        dataset.array = {};
        return expect(Promise.reject(new NotAllowedParameterError()))
            .rejects.toThrow();
    });

    test('it should throw that \'dataSet.array\' cannot be number type', () => {
        dataset.array = 1;
        return expect(Promise.reject(new NotAllowedParameterError()))
            .rejects.toThrow();
    });

    test('it should throw that \'dataSet.array\'  cannot be string type', () => {
        dataset.array = 1;
        return expect(Promise.reject(new NotAllowedParameterError()))
            .rejects.toThrow();
    });

    test('it should throw that \'treatString\' function do not have correct parameters', () => {
        treatString(1, 2, 3);
        return expect(Promise.reject(new NotAllowedParameterError('text', 'string', 'boolean')))
            .rejects.toThrow();
    });
})