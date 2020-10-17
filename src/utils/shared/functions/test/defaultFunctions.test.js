import { getCurrentTimeString, treatString, verifyParam } from '../defaultFunctions';
import { isArray, isString } from '../validateTypes';

const main = {
    array: [{
        id: 1,
        make: {
            age: ['2018', '2019', [{ a: 'isso' }]],

        }
    }],
}

describe('Validating \'initializeVariables\' function', () => {
    test('it should return \'false\' in \'verifyParam\' function', () => {
        expect(verifyParam('age', 'name', 'age')).toBe(false);
    })

    test('it should return that the current time is string type.', () => {
        expect(isString(getCurrentTimeString())).toBe(true);
    })
})