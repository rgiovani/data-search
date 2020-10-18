import { removeRedundancyFromStringArray } from '../../utils/shared/functions/defaultFunctions.js';
import { dataset } from '../../../index.js';
import { isArray } from '../../utils/shared/functions/validateTypes.js';

export function fillArrayOfIds(idsFounded, highestValue) {
    const res = isArray(idsFounded);
    if (res) {
        if (highestValue != 0) {
            dataset.array.forEach(item => {
                if (item.totalSearchesFound === highestValue) {
                    idsFounded.push(item.id)
                }
                item.totalSearchesFound = 0;
            });
            idsFounded = removeRedundancyFromStringArray(idsFounded, 0);
            return idsFounded;
        }
    }
}