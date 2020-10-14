import IdNotAllowedError from "../errors/IdNotAllowed.error.js";
import IdNotFoundError from "../errors/IdNotFound.error.js";
import IsNotArrayError from "../errors/IsNotArray.error.js";
import IsNotNumberError from "../errors/IsNotNumber.error.js";
import IsNotObjectError from "../errors/IsNotObject.error.js";
import IsNotStringError from "../errors/IsNotString.error.js";
import { hasAttr, hasAttrFilter } from "./defaultFunctions.js";


export function objectInArrayContainsId(array) {
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
        console.error(`\n[${e.type}] - ${e.description}`);
        console.error(`${e.stack}`);
    }
}

export function isObject(obj) {
    if (typeof obj == 'object' && !Array.isArray(obj)) {
        return true;
    }
    return false;
}

export function isArray(array) {
    if (Array.isArray(array)) {
        return true;
    }
    return false;
}

export function isStringAndNotId(field, idName) {
    if (typeof field == 'string' && field.toLowerCase() != idName.toLowerCase()) {
        return true;
    }
    return false;
}

export function isString(str) {
    if (typeof str == 'string') {
        return true;
    }
    return false;
}

function validateArrays(mainObj) {
    if (!Array.isArray(mainObj.array)) {
        throw new IsNotArrayError('RuntimeError', 'Field array');
    }
    mainObj.attributes = (!hasAttr(mainObj, 'attributes')) ? [] : mainObj.attributes;
    if (!Array.isArray(mainObj.attributes)) {
        throw new IsNotArrayError('RuntimeError', 'Field attribute');
    }
    mainObj.attributes.forEach(str => {
        if (!isString(str))
            throw new IsNotStringError('RuntimeError', 'attributes');
    })
    return mainObj;
}

export function initializeVariables(mainObj) {
    if (hasAttrFilter(mainObj, 'array')) {
        mainObj = validateArrays(mainObj);

        if (mainObj.nameId && typeof mainObj.nameId != 'string') {
            throw new IsNotStringError('RuntimeError', 'nameId');
        }
        mainObj.nameId = typeof mainObj.nameId == 'string' ? mainObj.nameId : 'id';

        if (mainObj.wordSize && typeof mainObj.wordSize != 'number') {
            throw new IsNotNumberError('RuntimeError', 'wordSize');
        }
        mainObj.wordSize = mainObj.wordSize <= 0 ? 0 : mainObj.wordSize - 1;
    };


}