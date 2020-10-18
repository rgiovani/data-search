import { isArray } from '../../utils/shared/functions/validateTypes.js';
import { dataset } from '../../../index.js';

export function getObjectBySimilarIds(ids) {
    if (isArray(ids)) {
        const objectsFound = [];
        if (ids) {
            dataset.array.forEach(object => {
                ids.forEach(id => {
                    if (object.id == id) {
                        objectsFound.push(object);
                    }
                });
            });

        }
        return objectsFound;
    }
}