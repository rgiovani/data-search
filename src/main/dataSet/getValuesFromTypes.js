const tags = require('./tags.js');
const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validateTypes = require('../../utils/shared/functions/validateTypes.js');
const create = require('./create.js');

let checkpoint;

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
                params.forEach(param => {
                    if (param == index.toLowerCase()) {
                        checkpoint = attribute;
                        getContentFromString(obj[attribute], index, params, idName, size);
                    } else {
                        if (validateTypes.isObject(obj[attribute][index])) {
                            checkpoint = attribute;
                            getContentFromObject(obj[attribute], index, params, idName, size);
                        } else if (validateTypes.isArray(obj[attribute][index])) {
                            checkpoint = attribute;
                            getContentFromArray(obj[attribute], index, params, idName, size)
                        } else {
                            create.attributeBox.add(obj[attribute], index);
                        }
                    }
                })
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
                if (validateTypes.isObject(obj[attribute])) {
                    getContentFromObject(obj, attribute, params, idName, size);
                } else if (validateTypes.isArray(obj[attribute])) {
                    getContentFromArray(obj, attribute, params, idName, size);
                }
                break;

        }
    }

    create.attributeBox.add(obj, attribute);

    return obj[attribute];
}

module.exports.getContentFromString = getContentFromString;
module.exports.getContentFromObject = getContentFromObject;
module.exports.getContentFromArray = getContentFromArray;