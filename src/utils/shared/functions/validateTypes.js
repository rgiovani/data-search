const { IdNotAllowedError } = require("../errors/IdNotAllowed.error.js");
const { IdNotFoundError } = require("../errors/IdNotFound.error.js");
const { IsNotArrayError } = require("../errors/IsNotArray.error.js");
const { IsNotNumberError } = require("../errors/IsNotNumber.error.js");
const { IsNotObjectError } = require("../errors/IsNotObject.error.js");
const { IsNotStringError } = require("../errors/IsNotString.error.js");
const defaultFunctions = require("./defaultFunctions.js");

function objectInArrayContainsId(array) {
    try {
        if (!Array.isArray(array)) {
            throw new IsNotArrayError();
        }
        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            if (typeof item != 'object') {
                throw new IsNotObjectError();
            }
            if (!item.hasOwnProperty('id')) {
                throw new IdNotFoundError();
            }
            if (typeof item.id != 'string' && typeof item.id != 'number') {
                throw new IdNotAllowedError();
            }
        }
        return array;
    } catch (e) {
        if (e.type && e.description)
            console.error(`\n[${e.type}] - ${e.description}`);
        else
            console.error(e.message)
    }
}

function isValue(value) {
    return (isString(value)) ? 'string'
        : (isArray(value)) ? 'array'
            : (isObject(value)) ? 'object'
                : undefined;
}

function isObject(obj) {
    return (typeof obj == 'object' && !Array.isArray(obj)) ? true : false
}

function isArray(array) {
    return (Array.isArray(array)) ? true : false;
}

function isStringAndNotId(field, idName) {
    return (typeof field == 'string' && field.toLowerCase() != idName.toLowerCase()) ? true : false

}

function isString(str) {
    return (typeof str == 'string') ? true : false;
}

function isArrayError(array, message) {
    if (!Array.isArray(array)) {
        throw new IsNotArrayError(message);
    }
    return true;
}

function allLowerCaseInArray(array, name) {
    for (let i = 0; i < array.length; i++) {
        if (!isString(array[i]))
            throw new IsNotStringError(name + '[' + i + ']');
        else {
            array[i] = array[i].toLowerCase();
        }
    }

    return array;
}


function validateArrays(mainObj) {
    try {
        if (!Array.isArray(mainObj.array)) {
            throw new IsNotArrayError('main.array');
        }
        mainObj.attributes = (!defaultFunctions.hasAttr(mainObj, 'attributes')) ? [] : mainObj.attributes;
        isArrayError(mainObj.attributes, 'main.attribute');
        mainObj.attributes = allLowerCaseInArray(mainObj.attributes, 'attributes');

        mainObj.ignoreInTags = (!defaultFunctions.hasAttr(mainObj, 'ignoreInTags')) ? [] : mainObj.ignoreInTags;
        isArrayError(mainObj.ignoreInTags, 'main.ignoreInTags');
        mainObj.ignoreInTags = allLowerCaseInArray(mainObj.ignoreInTags, 'ignoreInTags');

    } catch (e) {
        if (e.type && e.description)
            console.error(`\n[${e.type}] - ${e.description}`);
        else
            console.error(e.message)
    }

    return mainObj;
}

function initializeVariables(mainObj) {
    if (defaultFunctions.hasAttrFilter(mainObj, 'array')) {
        mainObj = validateArrays(mainObj);

        if (mainObj.nameId && typeof mainObj.nameId != 'string') {
            throw new IsNotStringError('nameId');
        }
        mainObj.nameId = typeof mainObj.nameId == 'string' ? mainObj.nameId : 'id';

        if (mainObj.wordSize && typeof mainObj.wordSize != 'number') {
            throw new IsNotNumberError('wordSize');
        }

        mainObj.wordSize = mainObj.wordSize <= 0 || !mainObj.wordSize ? 0 : mainObj.wordSize - 1;
    };

    return mainObj;
}

module.exports.objectInArrayContainsId = objectInArrayContainsId;
module.exports.isValue = isValue;
module.exports.isObject = isObject;
module.exports.isArray = isArray;
module.exports.isStringAndNotId = isStringAndNotId;
module.exports.isString = isString;
module.exports.initializeVariables = initializeVariables;
module.exports.validateArrays = validateArrays;