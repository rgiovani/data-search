const defaultFunctions = require('../defaultFunctions');
const validateTypes = require('../validateTypes');

describe('Validating \'initializeVariables\' function', () => {
    test('it should return \'false\' in \'verifyParam\' function', () => {
        expect(defaultFunctions.verifyParam('age', 'name', 'age')).toBe(false);
    })

    test('it should return that the current time is string type.', () => {
        expect(validateTypes.isString(defaultFunctions.getCurrentTimeString())).toBe(true);
    })
})