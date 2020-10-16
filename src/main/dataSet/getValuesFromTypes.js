import { equalsParam } from '../../utils/shared/functions/defaultFunctions.js';
import { isArray, isObject, isStringAndNotId } from '../../utils/shared/functions/validateTypes.js';
import { identifyTags } from './tags.js';

let checkpoint;

export function getContentFromArray(obj, attribute, params, idName, size) {
    obj[attribute].forEach((index) => {
        if (isStringAndNotId(index, idName) && equalsParam(attribute, params)) {
            checkpoint = attribute;
            identifyTags(params, attribute, obj, size, idName);
        } else if (isObject(index)) {
            Object.keys(index).forEach((word) => {
                getContentFromString(index, word, params, idName, size);
            });
        } else if (isArray(obj[attribute])) {
            //collection.verify(attribute.toLowerCase(), params);
            obj[attribute].forEach(item => {
                Object.keys(item).forEach((i) => {
                    checkpoint = attribute;
                    getContentFromString(item, i, params, idName, size);
                });
            })
        }
    })
    return obj[attribute];

}

export function getContentFromObject(obj, attribute, params, idName, size) {
    if (attribute != 'id' && attribute != 'tags') {
        if (isObject(obj[attribute])) {
            Object.keys(obj[attribute]).forEach((index) => {
                params.forEach(param => {
                    if (param == index.toLowerCase()) {
                        checkpoint = attribute;
                        getContentFromString(obj[attribute], index, params, idName, size);
                    } else {
                        if (isObject(obj[attribute][index])) {
                            checkpoint = attribute;
                            getContentFromObject(obj[attribute], index, params, idName, size);
                        } else if (isArray(obj[attribute][index])) {
                            checkpoint = attribute;
                            getContentFromArray(obj[attribute], index, params, idName, size)
                        }
                    }
                })
            });
        }
        return obj[attribute];
    }
}

export function getContentFromString(obj, attribute, params, idName, size) {
    if (attribute != 'id' && attribute != 'tags') {
        switch (typeof obj[attribute]) {
            case 'string':
                if (attribute == checkpoint || equalsParam(attribute, params))
                    identifyTags(params, attribute, obj, size, idName);
                break;
            case 'object':
                if (isObject(obj[attribute])) {
                    getContentFromObject(obj, attribute, params, idName, size);
                } else if (isArray(obj[attribute])) {
                    getContentFromArray(obj, attribute, params, idName, size);
                }
                break;
        }
    }
    return obj[attribute];
}