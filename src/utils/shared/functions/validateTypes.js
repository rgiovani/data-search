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

function isObject(obj) {
    if (typeof obj == 'object' && !Array.isArray(obj)) {
        return true;
    }
    return false;
}

function isArray(array) {
    if (Array.isArray(array)) {
        return true;
    }
    return false;
}

function isStringAndNotId(field, idName) {
    if (typeof field == 'string' && field.toLowerCase() != idName.toLowerCase()) {
        return true;
    }
    return false;
}

function isString(str) {
    if (typeof str == 'string') {
        return true;
    }
    return false;
}

function validateArrays(mainObj) {
    try {
        if (!Array.isArray(mainObj.array)) {
            throw new IsNotArrayError('main.array');
        }
        mainObj.attributes = (!defaultFunctions.hasAttr(mainObj, 'attributes')) ? [] : mainObj.attributes;
        if (!Array.isArray(mainObj.attributes)) {
            throw new IsNotArrayError('main.attribute');
        }

        for (let i = 0; i < mainObj.attributes.length; i++) {
            if (!isString(mainObj.attributes[i]))
                throw new IsNotStringError('attributes[' + i + ']');
            else {
                mainObj.attributes[i] = mainObj.attributes[i].toLowerCase();
            }
        }
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
module.exports.isObject = isObject;
module.exports.isArray = isArray;
module.exports.isStringAndNotId = isStringAndNotId;
module.exports.isString = isString;
module.exports.initializeVariables = initializeVariables;
module.exports.validateArrays = validateArrays;