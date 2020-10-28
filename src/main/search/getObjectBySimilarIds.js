const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validateTypes = require('../../utils/shared/functions/validateTypes.js');

function getObjectBySimilarIds(ids, dataset) {
    const objectsFound = [];
    if (validateTypes.isArray(ids)) {
        if (ids) {
            defaultFunctions.sortArrayOfObject(dataset, -1, 'totalSearchesFound');
            dataset.forEach(object => {
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