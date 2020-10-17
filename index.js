import NotAllowedParameterError from './src/utils/shared/errors/NotAllowedParameter.error.js';
import { initializeVariables, isObject, objectInArrayContainsId } from './src/utils/shared/functions/validateTypes.js';
import { create } from './src/main/dataSet/create.js';
import IsNotObjectError from './src/utils/shared/errors/IsNotObject.error.js';

export let dataset = {
    _array: [],
    get array() {
        return this._array;
    },
    set array(newArray) {
        try {
            if (!Array.isArray(newArray)) {
                throw new NotAllowedParameterError('newArray', 'array');
            }
            this._array = newArray;
        } catch (e) {
            console.error(`\n[${e.type}] - ${e.description}`);
        }
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
export function dataSetGenerate(main) {
    try {
        if (!isObject(main)) {
            throw new IsNotObjectError('main')
        }

        return generate(main);
    } catch (e) {
        console.error(`\n[${e.type}] - ${e.description}`);
    }
}

function generate(main) {
    try {
        initializeVariables(main);
        dataset.array = [];

        if (main.array.length > 0 && objectInArrayContainsId(main.array)) {
            main.array.forEach(obj => {
                if (!obj.hasOwnProperty(main.nameId)) throw new Error(`\'${main.nameId}\' does not match the object ID field name.`);

                dataset.array.push(create(obj, main.nameId, main.wordSize, main.attributes));
            })
        }

    } catch (e) {
        console.error(`\n[${e.type}] - ${e.description}`);
    }
    return dataset.array;
}