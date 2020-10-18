import { getContentFromArray, getContentFromString } from './getValuesFromTypes.js';
import { isObject, isArray, isString } from '../../utils/shared/functions/validateTypes.js';
import { collection } from './create.js';

function insideMainAtributes(obj, attribute, idName, size, params) {
    if (attribute != 'id' && attribute != 'tags') {
        if (typeof obj[attribute] == 'object') {
            getContentFromString(obj, attribute, params, idName, size);
        }
    }

    return obj[attribute];
}

export function mainAttributes(obj, attribute, idName, size, params) {
    params.forEach(mainAtribute => {
        if (mainAtribute == attribute.toLowerCase()) {
            if (isObject(obj[attribute])) {
                collection.name = mainAtribute;
                getContentFromString(obj, attribute, params, idName, size)
            } else if (isArray(obj[attribute])) {
                collection.name = mainAtribute;
                getContentFromArray(obj, attribute, params, idName, size);
            } else if (isString(obj[attribute])) {
                getContentFromString(obj, attribute, params, idName, size);
            }
        } else {
            insideMainAtributes(obj, attribute, idName, size, params);
        }
    })
    return obj;
}