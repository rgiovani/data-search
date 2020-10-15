import * as defaultFunctions from '../../utils/shared/functions/defaultFunctions.js';
import * as validateIf from '../../utils/shared/functions/validateTypes.js';
import { collection } from './ArrayOfObject.js';
import { identifyTags } from './tags.js';

export function getContentFromArray(obj, attribute, params, idName, size) {
    obj[attribute].forEach((index) => {
        if (validateIf.isStringAndNotId(index, idName)) {
            identifyTags(params, attribute, obj, size, idName);
        } else if (validateIf.isObject(index)) {

            Object.keys(index).forEach((i) => {
                if (i == collection.name)
                    getContentFromString(index, i, params, idName, size);
            });
        } else if (validateIf.isArray(obj[attribute])) {
            obj[attribute].forEach(item => {
                Object.keys(item).forEach((i) => {
                    getContentFromString(item, i, params, idName, size);
                });
            })
        }
    })
    return obj[attribute];

}

export function getContentFromObject(obj, attribute, params, idName, size) {
    if (attribute != 'id' && attribute != 'tags') {
        if (validateIf.isObject(obj[attribute])) {
            Object.keys(obj[attribute]).forEach((index) => {
                params.forEach(param => {
                    if (param == index)
                        getContentFromString(obj[attribute], index, params, idName, size);
                })
            });
        } else if (validateIf.isArray(obj[attribute])) {
            if (attribute == collection.name) {
                getContentFromArray(obj, attribute, params, idName, size)
            }
        };
    }
    return obj[attribute];
}

export function getContentFromString(obj, attribute, params, idName, size) {
    if (attribute != 'id' && attribute != 'tags') {
        switch (typeof obj[attribute]) {
            case 'string':
                identifyTags(params, attribute, obj, size, idName);
                break;
            case 'object':
                getContentFromObject(obj, attribute, params, idName, size)
                break;
        }
    }
    return obj[attribute];
}