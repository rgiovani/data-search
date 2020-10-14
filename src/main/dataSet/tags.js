import * as defaultFunctions from '../../utils/shared/functions/defaultFunctions.js';
import * as validateIf from '../../utils/shared/functions/validateTypes.js';
import * as object from './ArrayOfObject.js';

function fillTags(field, obj, size) {

    const wordsArray = defaultFunctions.treatString(field, true, size);
    wordsArray.forEach(word => {
        if (!object.tmp.tags.includes(word.toLowerCase()) && word.length >= size) {
            object.tmp.tags.push(word.toString().toLowerCase());
        }
    });

    return obj;
}

export function identifyTags(params, attribute, obj, size, idName) {
    params.forEach(paramAtribute => {
        if (defaultFunctions.verifyParam(attribute, paramAtribute, object.collection.name)) {
            switch (typeof obj[attribute]) {
                case 'string':
                    if (validateIf.isStringAndNotId(attribute.toLowerCase(), idName.toLowerCase())) {
                        fillTags(obj[attribute].toString(), obj, size);
                    }
                    break;
                case 'object':
                    if (validateIf.isArray(obj[attribute])) {
                        obj[attribute].forEach(item => {
                            (validateIf.isString(item)) ? fillTags(item.toString(), obj, size): item;
                        })
                    }
                    break;
            }

        }
    })

    return obj[attribute];
}