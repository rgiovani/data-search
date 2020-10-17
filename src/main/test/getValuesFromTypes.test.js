import { isObject } from '../../utils/shared/functions/validateTypes.js'
import { getContentFromString } from '../dataSet/getValuesFromTypes.js';

const main = {
    array: [{
        id: 1,
        make: {
            age: ['2018', '2019', [{ a: 'isso' }]],

        }
    }],
}

describe('Validating  getValuesFromTypes function', () => {
    test("it should return 1 from \'id\' value.", () => {
        main.array = [];
        main.array.push({ id: 1 });
        const res = getContentFromString(main.array[0], 'id', [''], 'id', 0);
        expect(res).toBe(1);


    })

});