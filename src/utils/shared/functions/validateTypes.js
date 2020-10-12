const IdNotAllowedError = require('../exceptions/IdNotAllowed.error.js');
const IdNotFoundError = require('../exceptions/IdNotFound.error.js');
const IsNotArrayError = require('../exceptions/IsNotArray.error.js');
const IsNotObjectError = require('../exceptions/IsNotObject.error.js');

module.exports.objectInArrayContainsId = function(array) {
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

module.exports.attrInObj = function(obj, attr) {
    let contains = false;
    Object.keys(obj).forEach((item) => {
        if (item.toLowerCase() == attr.toString().toLowerCase()) {
            contains = true;
        }
    });
    if (!contains) {
        throw new Error('The attribute: \'' + attr + '\' does not seem to exist.');
    }
    return contains;
}

module.exports.hasAttr = function(obj, attr) {
    let contains = false;
    Object.keys(obj).forEach((item) => {
        if (item == attr.toString()) {
            contains = true;
        }
    });
    return contains;
}

module.exports.isObject = function(obj) {
    if (typeof obj == 'object' && !Array.isArray(obj)) {
        return true;
    }
    return false;
}

module.exports.isArray = function(array) {
    if (Array.isArray(array)) {
        return true;
    }
    return false;
}

module.exports.isStringAndNotId = function(field, idName) {
    if (typeof field == 'string' && field.toLowerCase() != idName.toLowerCase()) {
        return true;
    }
    return false;
}

module.exports.isString = function(str) {
    if (typeof str == 'string') {
        return true;
    }
    return false;
}