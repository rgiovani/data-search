import { getContentFromArray, getContentFromString } from './checkAttributeTypes.js';
import { isObject, isArray, isString } from '../../utils/shared/functions/validateTypes.js';
import { collection } from './ArrayOfObject.js';

function changeCollectionName(atr) {
    collection.name = (!collection.name) ? atr : collection.name;
}

function insideMainAtributes(obj, attribute, idName, size, params) {
    if (attribute != 'id' && attribute != 'tags') {
        if (typeof obj[attribute] == 'object') {
            changeCollectionName(attribute);
        }
        getContentFromString(obj, attribute, params, idName, size);
    }

    return obj[attribute];

}

function mainAttributes(obj, attribute, idName, size, params) {
    params.forEach(mainAtribute => {
        if (mainAtribute == attribute) {
            if (isObject(obj[attribute])) {
                changeCollectionName(mainAtribute);
                getContentFromString(obj, attribute, params, idName, size)
            } else if (isArray(obj[attribute])) {
                changeCollectionName(mainAtribute);
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

const _mainAttributes = mainAttributes;
export { _mainAttributes as mainAttributes };