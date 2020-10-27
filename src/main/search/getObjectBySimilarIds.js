const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validateTypes = require('../../utils/shared/functions/validateTypes.js');
const generate = require('../dataSet/generateDataset.js');

function getObjectBySimilarIds(ids) {
    const objectsFound = [];
    if (validateTypes.isArray(ids)) {
        if (ids) {
            defaultFunctions.sortArrayOfObject(generate.dataset.array, -1, 'totalSearchesFound');
            generate.dataset.array.forEach(object => {
                ids.forEach(id => {
                    if (object.id == id) {
                        objectsFound.push(object);
                    }
                });
                object.totalSearchesFound = 0;
            });

        }
    }

    return objectsFound;
}

module.exports.getObjectBySimilarIds = getObjectBySimilarIds;