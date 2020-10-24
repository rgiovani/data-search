const { NotAllowedParameterError } = require('../errors/NotAllowedParameter.error.js');
const natural = require('natural');
const stringSimilarity = require('string-similarity');
const validateTypes = require('./validateTypes.js');

const { WordTokenizer, PresentVerbInflector } = natural;
const tokenizer = new WordTokenizer;

/** * This function remove special characters. 
 ** Tokenize(true): Split strings into an array for each word. */
function treatString(text, tokenize, size) {
    try {
        size = (!size) ? 0 : size;
        if (typeof text != 'string' && typeof tokenize != 'boolean') {
            throw new NotAllowedParameterError('text', 'string', 'boolean');
        }
        text = removeSpecialCharactersInString(text.toLowerCase());

        if (tokenize) {
            return removeRedundancyFromStringArray(tokenizer.tokenize(text), size);
        }

        return text;
    } catch (e) {
        if (e.type && e.description)
            console.error(`\n[${e.type}] - ${e.description}`);
    }
}

/** * This function remove special characters from string*/
function removeSpecialCharactersInString(text) {
    const token = tokenizer.tokenize(text);
    token.forEach(() => {
        text = text.replace('ç', 'c').replace('ê', 'e')
            .replace('é', 'e').replace('á', 'a')
            .replace('ã', 'a').replace('â', 'a').replace('õ', 'o');
    })
    return text;
}

/** * This function remove duplicate words in array of strings */
function removeRedundancyFromStringArray(token, size) {
    const newToken = [];
    token.forEach(word => { //ID - String
        if (validateTypes.isString(word)) {
            if (!newToken.includes(word.toLowerCase()) && word.length > size) {
                newToken.push(word.toString().toLowerCase());
            }
        } else if (!isNaN(word)) { //ID - Number
            if (!newToken.includes(word)) {
                newToken.push(word);
            }
        }
    });
    return newToken;
}

//** This functions transform an String in a Array of strings. */
function transformStringInArray(str) {
    const token = tokenizer.tokenize(str);
    return token;
}

//** This function to compare two strings based on the similar value between them * /
function similarStrings(text, tags, similarValue) {
    tags = removeRedundancyFromStringArray(tags, 0);
    if (validateTypes.isString(text) && validateTypes.isArray(tags)) {
        const matches = stringSimilarity.findBestMatch(text, tags);
        for (const i in matches.ratings) {
            if (matches.ratings[i].rating > similarValue) {
                return true;
            }
        }
    }
    return false;
}

//** This function make plural strings become singular */
function makeStringSingular(word) {
    const verbInflector = new PresentVerbInflector();
    verbInflector.pluralize(word);
}

//** This function orders a object array*/
function sortArrayOfObject(array, sort, sortAttribute) {
    let response;
    if (sort == 1) {
        response = array.sort((a, b) => (a[sortAttribute] > b[sortAttribute]) ? 1 : -1);
    } else {
        response = array.sort((a, b) => (a[sortAttribute] > b[sortAttribute]) ? -1 : 1);
    }
    return response;

}

//** This function returns the current system time in string format*/
function getCurrentTimeString() {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

//** This function checks if the attribute is the same as the one requested*/
function verifyParam(attribute, param, collectionName) {
    if (attribute.toLowerCase() == param || collectionName == param) {
        return true;
    }
    return false;
}

function equalsParam(attribute, params) {
    let contains = false
    params.forEach(param => {
        if (attribute.toLowerCase() == param) {
            contains = true;
        }
    })
    return contains;
}

//** This function throws an Error if the attribute was not found */
function hasAttrFilter(obj, attr) {
    if (!hasAttr(obj, attr)) {
        throw new Error('The attribute: \'' + attr + '\' does not seem to exist.')
    };

    return true;
}

//** This function just return false if attribute was not found */
function hasAttr(obj, attr) {
    let contains = false
    Object.keys(obj).forEach((item) => {
        if (item == attr) {
            contains = true;
        }
    });
    return contains;
}

module.exports.hasAttr = hasAttr;
module.exports.hasAttrFilter = hasAttrFilter;
module.exports.equalsParam = equalsParam;
module.exports.verifyParam = verifyParam;
module.exports.getCurrentTimeString = getCurrentTimeString;
module.exports.sortArrayOfObject = sortArrayOfObject;
module.exports.makeStringSingular = makeStringSingular;
module.exports.similarStrings = similarStrings;
module.exports.removeRedundancyFromStringArray = removeRedundancyFromStringArray;
module.exports.removeSpecialCharactersInString = removeSpecialCharactersInString;
module.exports.treatString = treatString
module.exports.transformStringInArray = transformStringInArray;