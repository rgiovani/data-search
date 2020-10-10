const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validate = require('../../utils/shared/functions/validateTypes.js');

let tmpTags = [];

function verifyParam(params, attribute, obj, size, idName) {
    if (typeof obj[attribute] != 'object' && !Array.isArray(obj[attribute])) {
        params.forEach(paramAtribute => {
            if (attribute.toLowerCase() != idName.toLowerCase() && attribute == paramAtribute) {
                fillTags(obj[attribute].toString(), obj, size);
            }
        })
    } else if (Array.isArray(obj[attribute])) {
        obj[attribute].forEach(item => {
            fillTags(item.toString(), obj, size);

        })
    }
}

function isArrayOrObject(obj, attribute, params, idName, size) {
    if (attribute != 'id' && attribute != 'tags') {
        if (typeof obj[attribute] == 'object' && !Array.isArray(obj[attribute])) {
            Object.keys(obj[attribute]).forEach((index) => {
                isString(obj[attribute], index, params, idName, size);
            });
            return true;
        } else if (Array.isArray(obj[attribute])) {
            obj[attribute].forEach((index) => {
                if (typeof index == 'string' && index.toLowerCase() != idName.toLowerCase()) {
                    verifyParam(params, attribute, obj, size, idName);
                } else if (typeof index == 'object') {
                    Object.keys(index).forEach((i) => {
                        isString(index, i, params, idName, size);
                    });
                }
                return true
            })
        };
    }
    return false;
}

function isString(obj, attribute, params, idName, size) {
    if (attribute != 'id' && attribute != 'tags') {
        if (typeof obj[attribute] == 'string') {
            verifyParam(params, attribute, obj, size, idName);
            return true;
        } else if (typeof obj[attribute] == 'object') {
            isArrayOrObject(obj, attribute, params, idName, size)
        }
    }
    return obj;
}

module.exports.create = function(obj, idName, size, ...params) {
    obj.tags = []
    tmpTags = obj.tags;
    Object.keys(obj).forEach((attribute) => {
        if (attribute != 'id' && attribute != 'tags') {
            if (typeof obj[attribute] == 'object' || Array.isArray(obj[attribute])) {
                isArrayOrObject(obj, attribute, params, idName, size)
            } else {
                isString(obj, attribute, params, idName, size);
            }
        }
    });
    obj.tags = tmpTags;
    return obj;
}

function fillTags(field, obj, size) {
    const wordsArray = defaultFunctions.treatString(field, true, size);
    wordsArray.forEach(word => {
        if (!tmpTags.includes(word.toLowerCase()) && word.length >= size) {
            tmpTags.push(word.toString().toLowerCase());
        }
    });
    return obj;
}