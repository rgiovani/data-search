const inCreate = require('./create.js');
const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validateTypes = require('../../utils/shared/functions/validateTypes.js');

function fillTags(field, size) {
    const wordsArray = defaultFunctions.treatString(field, true, size);

    wordsArray.forEach(word => {
        const tagsToIgnore = inCreate.getTagsToIgnore();
        if (!inCreate.tmp.tags.includes(word.toLowerCase()) && word.length >= size) {
            if (!tagsToIgnore.includes(word.toLowerCase())) {
                inCreate.tmp.tags.push(word.toString().toLowerCase());
            }
        }
    });

}

function identifyTags(params, attribute, obj, size, idName) {
    params.forEach(paramAtribute => {
        if (defaultFunctions.verifyParam(attribute, paramAtribute, inCreate.collection.name)) {
            switch (typeof obj[attribute]) {
                case 'string':
                    const isAttributeNotId = validateTypes.isStringAndNotId(attribute.toLowerCase(), idName.toLowerCase());
                    (isAttributeNotId) && fillTags(obj[attribute].toString(), size);
                    break;
                case 'object':
                    if (validateTypes.isArray(obj[attribute])) {
                        obj[attribute].forEach(item => {
                            (validateTypes.isString(item)) ? fillTags(item.toString(), size) : item;
                        })
                    }
                    break;
            }
        }
    })

    return obj[attribute];
}

module.exports.identifyTags = identifyTags;