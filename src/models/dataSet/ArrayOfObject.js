const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validate = require('../../utils/shared/functions/validateTypes.js');

let tmpTags = [];

function isArrayOrObject(obj, attribute, params, idName, size) {
    if (attribute != 'id' && attribute != 'tags') {
        if (typeof obj[attribute] == 'object' && !Array.isArray(obj[attribute])) {
            Object.keys(obj[attribute]).forEach((attributeObj) => {
                isString(obj[attribute], attributeObj, params, idName, size);
            });
            return true;
        } else if (typeof obj[attribute] != 'object' && Array.isArray(obj[attribute])) {
            //TODO percorrer os arrays de dados.
            return true
        };
    }
    return false;
}

function isString(obj, attribute, params, idName, size) {
    if (attribute != 'id' && attribute != 'tags') {
        if (typeof obj[attribute] == 'string') {
            params.forEach(paramAtribute => {
                if (attribute.toLowerCase() != idName.toLowerCase()) {
                    if (attribute == paramAtribute) {
                        fillTags(obj[attribute].toString(), obj, size);
                    }
                }
            })
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