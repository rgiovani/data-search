const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validate = require('../../utils/shared/functions/validateTypes.js');

module.exports.create = function(obj, idName, size, ...params) {
    obj.tags = [];
    Object.keys(obj).forEach((item) => {
        params.forEach(param => {
            if (item.toLowerCase() != idName.toLowerCase() && item == param) {
                fillTags(obj[item].toString(), obj, size);
            }
        })
    });
    return obj;
}

function fillTags(field, obj, size) {
    const wordsArray = defaultFunctions.treatString(field, true, size);
    wordsArray.forEach(word => {
        if (!obj.tags.includes(word.toLowerCase()) && word.length >= size) {
            obj.tags.push(word.toString().toLowerCase());
        }
    });
    return obj;
}