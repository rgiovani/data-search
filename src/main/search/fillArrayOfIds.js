const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validate = require('../../utils/shared/functions/validateTypes.js');
const generate = require('../dataSet/generateDataset.js');

function fillArrayOfIds(idsFounded, highestValue) {
    if (validate.isArray(idsFounded)) {
        if (highestValue != 0) {
            generate.dataset.array.forEach(item => {
                if (item.totalSearchesFound === highestValue) {
                    idsFounded.push(item.id)
                }
            });
            idsFounded = defaultFunctions.removeRedundancyFromStringArray(idsFounded, 0);
            return idsFounded;
        }
    }
}

module.exports.fillArrayOfIds = fillArrayOfIds;