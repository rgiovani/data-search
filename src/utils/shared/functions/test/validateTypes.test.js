import { initializeVariables, isObject } from '../validateTypes.js'

describe('Validating \'validateTypes\' function', () => {
    test('it should return an \'object\' from initializeVariables function', () => {
        const main = {
            array: [],
            wordSize: 2
        }
        const res = initializeVariables(main);
        expect(isObject(res)).toBe(true);

    })
})