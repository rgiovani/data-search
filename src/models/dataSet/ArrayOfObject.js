const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validate = require('../../utils/shared/functions/validateTypes.js');

module.exports.create = function(obj, idName, ...params) {
    obj.tags = [];
    Object.keys(obj).forEach((item) => {
        params.forEach(param => {
            if (item.toLowerCase() != idName.toLowerCase() && item == param) {
                fillTags(obj[item].toString(), obj);
            }
        })
    });
    return obj;
}

function fillTags(field, obj) {
    const wordsArray = defaultFunctions.treatString(field, true);
    wordsArray.forEach(word => {
        if (!obj.tags.includes(word.toLowerCase()) && word.length > 3) {
            obj.tags.push(word.toString().toLowerCase());
        }
    });
    return obj;
}