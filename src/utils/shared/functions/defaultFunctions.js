const NotAllowedParameterError = require('../exceptions/NotAllowedParameter.error.js');
const validate = require('./validateTypes.js');
const stringSimilarity = require('string-similarity');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();


/** * This function remove special characters. 
 ** Tokenize(true): Split strings into an array for each word. */
module.exports.treatString = function(text, tokenize) {
    if (typeof text != 'string' && typeof tokenize != 'boolean') {
        throw new NotAllowedParameterError('text', 'string', 'boolean');
    }
    text = this.removeSpecialCharactersInString(text.toLowerCase());

    if (tokenize) {
        return this.removeRedundancyFromStringArray(tokenizer.tokenize(text));
    }

    return text;
}

/** * This function remove special characters from string*/
module.exports.removeSpecialCharactersInString = function(text) {
    text = text.replace('ç', 'c').replace('ê', 'e')
        .replace('é', 'e').replace('á', 'a')
        .replace('ã', 'a').replace('â', 'a');
    return text;
}

/** * This function remove duplicate words in array of strings */
module.exports.removeRedundancyFromStringArray = function(token) {
    const newToken = [];
    token.forEach(word => {
        if (!newToken.includes(word.toLowerCase()) && word.length > 2) {
            newToken.push(word.toString().toLowerCase());
        }
    });
    return newToken;
}

//** This function to compare two strings based on the similar value between them * /
module.exports.similarStrings = function(text, tags, similarValue) {
    tags = removeRedundancyFromStringArray(tags);
    const matches = stringSimilarity.findBestMatch(text, tags);
    for (const i in matches.ratings) {
        if (matches.ratings[i].rating > similarValue) {
            return true;
        }
    }
    return false;
}

//** This function make plural strings become singular */
module.exports.makeStringSingular = function(word) {
    const verbInflector = new natural.PresentVerbInflector();
    verbInflector.pluralize(word);
}

//** This function orders a object array*/
module.exports.sortArrayOfObject = function(array, sort, attr) {
    try {
        array.forEach(obj => {
            validate.attrInObj(obj, attr);
        })
        let response;
        if (sort == 1) {
            response = array.sort((a, b) => (a[attr] > b[attr]) ? 1 : -1);
        } else {
            response = array.sort((a, b) => (a[attr] > b[attr]) ? -1 : 1);
        }
        return response;
    } catch (e) {
        console.error(e.stack)
    }
}

//** This function returns the current system time in string format*/
module.exports.getCurrentTimeString = function() {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}