const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validate = require('../../utils/shared/functions/validateTypes.js');

function fillArrayOfIds(idsFounded, highestValue, dataset) {
    if (validate.isArray(idsFounded)) {
        if (highestValue != 0) {
            dataset.forEach(item => {
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