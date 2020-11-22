const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validateTypes = require('../../utils/shared/functions/validateTypes.js');

function getObjectBySimilarIds(ids, dataset) {
    let objectsFound = [];
    if (validateTypes.isArray(ids)) {
        if (ids) {
            defaultFunctions.sortArrayOfObject(dataset, -1, 'totalSearchesFound');
            ids.forEach(id => {
                dataset.map(object => { object.totalSearchesFound = 0; return object })
                    .filter(object => object.id == id)
                    .forEach(object => objectsFound.push(object));
            });
        }
    }

    return objectsFound;
}

module.exports.getObjectBySimilarIds = getObjectBySimilarIds;