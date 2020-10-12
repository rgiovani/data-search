const IsNotArrayError = require('./src/utils/shared/exceptions/IsNotArray.error.js');
const IdNotFoundError = require('./src/utils/shared/exceptions/IdNotFound.error.js')
const NotAllowedParameterError = require('./src/utils/shared/exceptions/NotAllowedParameter.error.js');
const validateIf = require('./src/utils/shared/functions/validateTypes.js');
const arrayOfObject = require('./src/models/dataSet/ArrayOfObject.js')
const defaultFunction = require('./src/utils/shared/functions/defaultFunctions.js');
const IsNotObjectError = require('./src/utils/shared/exceptions/IsNotObject.error.js');

let dataset = {
    _array: [],
    get array() {
        return this._array;
    },
    set array(newArray) {
        if (!Array.isArray(newArray)) {
            throw new NotAllowedParameterError('newArray', 'array');
        }
        this._array = newArray;
    }
}

/**
 * This function generates a data set based on an array of objects. **ID field required on each object**.
 * @param {Object} main Main object with options.
 * @param {[object]} main.array Array of objects.
 * @param {string} main.nameId Name of the identification field in your objects - \'id\' by default.
 * @param {number} main.wordSize Size of the words you want to filter to generate the tags. \'2\' by default
 * @param {[string]} main.attributes Name of the attributes on the objects you need to generate the tags.
 * @return Array of objects with an array of tags on each object in the array.
 */
exports.dataSetGenerate = function(main) {
    if (!validateIf.isObject(main)) {
        throw new IsNotObjectError('RuntimeError', 'object')
    }

    return generate(main);
}

function generate(main) {
    try {
        main.wordSize = main.wordSize <= 0 || typeof main.wordSize != 'number' ? 0 : main.wordSize - 1;
        main.nameId = typeof main.nameId == 'string' ? main.nameId : 'id';
        dataset.array = [];
        if (Array.isArray(main.array)) {
            if (main.array.length > 0) {
                if (validateIf.objectInArrayContainsId(main.array)) {
                    main.array.forEach(obj => {
                        if (!obj.hasOwnProperty(main.nameId)) {
                            throw new Error(`\'${main.nameId}\' does not match the object ID field name.`);
                        }
                        dataset.array.push(arrayOfObject.create(obj, main.nameId, main.wordSize, main.attributes));
                    })
                }
            }
        } else {
            throw new IsNotArrayError('RuntimeError', 'Field array');
        }
    } catch (e) {
        console.error(`\n[${e.type}] - ${e.description}`);
        console.error(`${e.stack}`);
    }
    return dataset.array;
}