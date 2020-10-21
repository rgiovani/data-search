import NotAllowedParameterError from "../../utils/shared/errors/NotAllowedParameter.error.js";
import { initializeVariables, objectInArrayContainsId } from "../../utils/shared/functions/validateTypes.js";
import { create } from "./create.js";

export let dataset = {
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

export function generate(main) {
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
        if (e.type && e.description)
            console.error(`\n[${e.type}] - ${e.description}`);
        else
            console.error(e.message)
    }
    dataset.createdAt = new Date();
    return dataset.array;
}

export function findDataset() {
    return dataset;
}