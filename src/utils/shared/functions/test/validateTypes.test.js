const validateTypes = require('../validateTypes.js');

describe('Validating \'validateTypes\' function', () => {
    test('it should return an \'object\' from initializeVariables function', () => {
        const main = {
            array: [],
            wordSize: 2
        }
        const res = validateTypes.initializeVariables(main);
        expect(validateTypes.isObject(res)).toBe(true);

    })
})