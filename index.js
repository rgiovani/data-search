const IsNotArrayError = require('./src/utils/shared/exceptions/IsNotArray.error.js');
const NotAllowedParameterError = require('./src/utils/shared/exceptions/NotAllowedParameter.error.js');
const validate = require('./src/utils/shared/functions/validateTypes.js');
const arrayOfObject = require('./src/models/dataSet/ArrayOfObject.js')
const defaultFunction = require('./src/utils/shared/functions/defaultFunctions.js');

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
 * @param newData Array of objects.
 * @param idName Name of the identification field in your objects - \'id\' by default.
 * @param size Size of the words you want to filter to generate the tags.
 * @param params Name of the attributes on the objects you need to generate the tags.
 * @return Array of objects with an array of tags on each object in the array.
 */
exports.dataSetGenerate = function(newData, idName, size, ...params) {
    size = size <= 0 || typeof size != 'number' ? 0 : size - 1;
    idName = typeof idName == 'string' ? idName : 'id';
    dataset.array = [];
    try {
        if (newData.length > 0) {
            if (validate.objectInArrayContainsId(newData)) {
                newData.forEach(item => {
                    dataset.array.push(arrayOfObject.create(item, idName, size, ...params));
                })
            }
        } else if (!Array.isArray(newData)) {
            throw new IsNotArrayError();
        }
    } catch (e) {
        console.error(`\n[${e.type}] - ${e.description}`);
        console.error(`${e.stack}`);
    }

    return dataset.array;
}