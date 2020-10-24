const { NotAllowedParameterError } = require("../../utils/shared/errors/NotAllowedParameter.error.js");
const validateTypes = require("../../utils/shared/functions/validateTypes.js");
const { create } = require("./create.js");

let dataset = {
    _array: [],
    createdAt: undefined,
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
            if (e.type && e.description)
                console.error(`\n[${e.type}] - ${e.description}`);
            else
                console.error(e.message)
        }
    }
}

function generate(main) {
    try {
        validateTypes.initializeVariables(main);
        dataset.array = [];

        if (main.array.length > 0 && validateTypes.objectInArrayContainsId(main.array)) {
            main.array.forEach(obj => {
                if (!obj.hasOwnProperty(main.nameId)) throw new Error(`\'${main.nameId}\' does not match the object ID field name.`);

                dataset.array.push(create(obj, main.nameId, main.wordSize, main.attributes));
            })
        }

    } catch (e) {
        if (e.type && e.description)
            console.error(`\n[${e.type}] - ${e.description}`);
        else {
            console.error(e.message)
            console.error(e.stack)
        }
    }
    dataset.createdAt = new Date();
    return dataset.array;
}

function findDataset() {
    return dataset;
}

module.exports.findDataset = findDataset;
module.exports.generate = generate;
module.exports.dataset = dataset;