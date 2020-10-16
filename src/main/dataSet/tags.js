import { treatString, verifyParam } from '../../utils/shared/functions/defaultFunctions.js';
import { isArray, isString, isStringAndNotId } from '../../utils/shared/functions/validateTypes.js';
import { collection, tmp } from './create.js';

function fillTags(field, size) {
    const wordsArray = treatString(field, true, size);
    wordsArray.forEach(word => {
        if (!tmp.tags.includes(word.toLowerCase()) && word.length >= size) {
            tmp.tags.push(word.toString().toLowerCase());
        }
    });
}

export function identifyTags(params, attribute, obj, size, idName) {
    params.forEach(paramAtribute => {
        if (verifyParam(attribute, paramAtribute, collection.name)) {
            switch (typeof obj[attribute]) {
                case 'string':
                    if (isStringAndNotId(attribute.toLowerCase(), idName.toLowerCase())) {
                        fillTags(obj[attribute].toString(), size);
                    }
                    break;
                case 'object':
                    if (isArray(obj[attribute])) {
                        obj[attribute].forEach(item => {
                            (isString(item)) ? fillTags(item.toString(), size): item;
                        })
                    }
                    break;
            }

        }
    })

    return obj[attribute];
}