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
            switch (validate.isValue(obj[attribute])) {
                case 'object':
                    inCreate.collection.name = mainAtribute;
                    gets.getContentFromString(obj, attribute, params, idName, size)
                    break;
                case 'array':
                    inCreate.collection.name = mainAtribute;
                    gets.getContentFromArray(obj, attribute, params, idName, size);
                    break;
                case 'string':
                    gets.getContentFromString(obj, attribute, params, idName, size);
                    break;
                default:
                    break;
            }
        } else {
            insideMainAtributes(obj, attribute, idName, size, params);
        }
    })
    return obj;
}

module.exports.mainAttributes = mainAttributes;