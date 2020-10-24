const gets = require('./getValuesFromTypes.js');
const validate = require('../../utils/shared/functions/validateTypes.js');
const inCreate = require('./create.js');

function insideMainAtributes(obj, attribute, idName, size, params) {
    if (attribute != 'id' && attribute != 'tags') {
        if (typeof obj[attribute] == 'object') {
            gets.getContentFromString(obj, attribute, params, idName, size);
        }
    }

    return obj[attribute];
}

function mainAttributes(obj, attribute, idName, size, params) {
    params.forEach(mainAtribute => {
        if (mainAtribute == attribute.toLowerCase()) {
            if (validate.isObject(obj[attribute])) {
                inCreate.collection.name = mainAtribute;
                // inCreate.setNameCollection(mainAtribute);
                gets.getContentFromString(obj, attribute, params, idName, size)
            } else if (validate.isArray(obj[attribute])) {
                inCreate.collection.name = mainAtribute;
                //inCreate.setNameCollection(mainAtribute);
                gets.getContentFromArray(obj, attribute, params, idName, size);
            } else if (validate.isString(obj[attribute])) {
                gets.getContentFromString(obj, attribute, params, idName, size);
            }
        } else {
            insideMainAtributes(obj, attribute, idName, size, params);
        }
    })
    return obj;
}

module.exports.mainAttributes = mainAttributes;