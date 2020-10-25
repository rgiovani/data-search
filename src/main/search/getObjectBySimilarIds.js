const validateTypes = require('../../utils/shared/functions/validateTypes.js');
const generate = require('../dataSet/generateDataset.js');

function getObjectBySimilarIds(ids) {
    const objectsFound = [];
    if (validateTypes.isArray(ids)) {
        if (ids) {
            generate.dataset.array.forEach(object => {
                ids.forEach(id => {
                    if (object.id == id) {
                        objectsFound.push(object);
                    }
                });
            });

        }
    }
    return objectsFound;
}

module.exports.getObjectBySimilarIds = getObjectBySimilarIds;