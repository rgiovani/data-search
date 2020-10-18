import NotAllowedParameterError from '../errors/NotAllowedParameter.error.js';
import natural from 'natural';
import stringSimilarity from 'string-similarity';
import { isArray, isString } from './validateTypes.js';

const { WordTokenizer } = natural;
const tokenizer = new WordTokenizer;


/** * This function remove special characters. 
 ** Tokenize(true): Split strings into an array for each word. */
export function treatString(text, tokenize, size) {
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
export function removeSpecialCharactersInString(text) {
    text = text.replace('ç', 'c').replace('ê', 'e')
        .replace('é', 'e').replace('á', 'a')
        .replace('ã', 'a').replace('â', 'a');
    return text;
}

/** * This function remove duplicate words in array of strings */
export function removeRedundancyFromStringArray(token, size) {
    const newToken = [];
    token.forEach(word => { //ID - String
        if (isString(word)) {
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

//** This function to compare two strings based on the similar value between them * /
export function similarStrings(text, tags, similarValue) {
    tags = removeRedundancyFromStringArray(tags, 0);
    if (isString(text) && isArray(tags)) {
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
export function makeStringSingular(word) {
    const verbInflector = new PresentVerbInflector();
    verbInflector.pluralize(word);
}

//** This function orders a object array*/
export function sortArrayOfObject(array, sort, sortAttribute) {
    let response;
    if (sort == 1) {
        response = array.sort((a, b) => (a[sortAttribute] > b[sortAttribute]) ? 1 : -1);
    } else {
        response = array.sort((a, b) => (a[sortAttribute] > b[sortAttribute]) ? -1 : 1);
    }
    return response;

}

//** This function returns the current system time in string format*/
export function getCurrentTimeString() {
    const date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

//** This function checks if the attribute is the same as the one requested*/
export function verifyParam(attribute, param, collectionName) {
    if (attribute.toLowerCase() == param || collectionName == param) {
        return true;
    }
    return false;
}

export function equalsParam(attribute, params) {
    let contains = false
    params.forEach(param => {
        if (attribute.toLowerCase() == param) {
            contains = true;
        }
    })
    return contains;
}


//** This function throws an Error if the attribute was not found */
export function hasAttrFilter(obj, attr) {
    if (!hasAttr(obj, attr)) throw new Error('The attribute: \'' + attr + '\' does not seem to exist.');

    return true;
}

//** This function just return false if attribute was not found */
export function hasAttr(obj, attr) {
    let contains = false
    Object.keys(obj).forEach((item) => {
        if (item == attr) {
            contains = true;
        }
    });
    return contains;
}