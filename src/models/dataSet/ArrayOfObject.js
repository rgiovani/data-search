const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validateIf = require('../../utils/shared/functions/validateTypes.js');

let tmpTags = [];
let collectionName;

function fillTags(field, obj, size) {
    const wordsArray = defaultFunctions.treatString(field, true, size);
    wordsArray.forEach(word => {
        if (!tmpTags.includes(word.toLowerCase()) && word.length >= size) {
            tmpTags.push(word.toString().toLowerCase());
        }
    });
    return obj;
}

function identifyTags(params, attribute, obj, size, idName) {
    params.forEach(paramAtribute => {
        if (defaultFunctions.verifyParam(attribute, paramAtribute, collectionName)) {
            switch (typeof obj[attribute]) {
                case 'string':
                    if (validateIf.isStringAndNotId(attribute.toLowerCase(), idName.toLowerCase())) {
                        fillTags(obj[attribute].toString(), obj, size);
                    }
                    break;
                case 'object':
                    if (validateIf.isArray(obj[attribute])) {
                        obj[attribute].forEach(item => {
                            (validateIf.isString(item)) ? fillTags(item.toString(), obj, size): item
                        })
                        break;
                    }
            }

        }
    })
}

function checkArray(obj, attribute, params, idName, size) {
    obj[attribute].forEach((index) => {
        if (validateIf.isStringAndNotId(index, idName)) {
            identifyTags(params, attribute, obj, size, idName);
        } else if (validateIf.isObject(index)) {
            Object.keys(index).forEach((i) => {
                checkString(index, i, params, idName, size);
            });
        } else if (validateIf.isArray(obj[attribute])) {
            obj[attribute].forEach(item => {
                Object.keys(item).forEach((i) => {
                    checkString(item, i, params, idName, size);
                });
            })
        }
    })
}

function checkObject(obj, attribute, params, idName, size) {
    if (attribute != 'id' && attribute != 'tags') {
        if (validateIf.isObject(obj[attribute])) {
            Object.keys(obj[attribute]).forEach((index) => {
                checkString(obj[attribute], index, params, idName, size);
            });
        } else if (validateIf.isArray(obj[attribute])) {
            checkArray(obj, attribute, params, idName, size)
        };
    }
}

function checkString(obj, attribute, params, idName, size) {
    if (attribute != 'id' && attribute != 'tags') {
        switch (typeof obj[attribute]) {
            case 'string':
                identifyTags(params, attribute, obj, size, idName);
                break;
            case 'object':
                checkObject(obj, attribute, params, idName, size)
                break;
        }
    }
}

module.exports.create = function(obj, idName, size, params) {
    obj.tags = []
    tmpTags = obj.tags;
    Object.keys(obj).forEach((attribute) => {
        params.forEach(requestCollectionAttr => {
            if (requestCollectionAttr == attribute) {
                if (validateIf.isObject(obj[attribute])) {
                    collectionName = requestCollectionAttr;
                    checkString(obj[attribute], attribute, params, idName, size)
                } else if (validateIf.isArray(obj[attribute])) {
                    collectionName = requestCollectionAttr;
                    checkArray(obj, attribute, params, idName, size);
                }
            }
        })
        if (attribute != 'id' && attribute != 'tags') {
            switch (typeof obj[attribute]) {
                case 'object':
                    collectionName = attribute;
                    checkObject(obj, attribute, params, idName, size)
                    break;
                case 'string':
                    checkString(obj, attribute, params, idName, size);
                    break;

            }
        }
    });
    obj.tags = tmpTags;
    return obj;
}