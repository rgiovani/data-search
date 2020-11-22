const tags = require('./tags.js');
const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validateTypes = require('../../utils/shared/functions/validateTypes.js');
const create = require('./create.js');

let checkpoint;

function switchTo(set, index, params, idName, size, setName) {
    switch (validateTypes.isValue(set[index])) {
        case 'object':
            checkpoint = setName
            getContentFromObject(set, index, params, idName, size);
            break;
        case 'array':
            checkpoint = setName
            getContentFromArray(set, index, params, idName, size)
            break;
        case 'string':
            checkpoint = setName
            getContentFromString(set, index, params, idName, size)
            break;
        default:
            create.attributeBox.add(set, index);
            break;
    }
}

function getContentFromArray(obj, attribute, params, idName, size) {
    obj[attribute].forEach((index) => {
        if (validateTypes.isStringAndNotId(index, idName) && defaultFunctions.equalsParam(attribute, params)) {
            checkpoint = attribute;
            tags.identifyTags(params, attribute, obj, size, idName);
        } else if (validateTypes.isObject(index)) {
            Object.keys(index).forEach((word) => {
                getContentFromString(index, word, params, idName, size);
            });
        } else if (validateTypes.isArray(obj[attribute])) {
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

function getContentFromObject(obj, attribute, params, idName, size) {
    if (attribute != 'id' && attribute != 'tags') {
        if (validateTypes.isObject(obj[attribute])) {
            Object.keys(obj[attribute]).forEach((index) => {
                switchTo(obj[attribute], index, params, idName, size, attribute);
            });
        }
        return obj[attribute];
    }
}

function getContentFromString(obj, attribute, params, idName, size) {
    if (attribute != 'id' && attribute != 'tags') {
        switch (typeof obj[attribute]) {
            case 'string':
                create.attributeBox.add(obj, attribute);
                if (attribute == checkpoint || defaultFunctions.equalsParam(attribute, params))
                    tags.identifyTags(params, attribute, obj, size, idName);
                break;
            case 'object':
                switchTo(obj, attribute, params, idName, size, attribute);
                break;
        }
    }
    create.attributeBox.add(obj, attribute);

    return obj[attribute];
}

module.exports.getContentFromString = getContentFromString;
module.exports.getContentFromObject = getContentFromObject;
module.exports.getContentFromArray = getContentFromArray;