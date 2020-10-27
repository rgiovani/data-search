const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const gets = require('./getObjectBySimilarIds.js');
const similar = require('./findSimilarMatches.js');
const fill = require('./fillArrayOfIds.js');
const generate = require('../dataSet/generateDataset.js');
const natural = require('natural');
const create = require('../dataSet/create.js');

const metaphone = natural.Metaphone;

let mainInfoFromObject = [];
let similarsWords = [];
let similarIds = { ids: [] };
let idsFound = [];
let foundInMainInfo = 0;
let highestValue = 0;


function doSearch(all, field, filterByValue) {
    let res = [];
    mainInfoFromObject = [];
    similarsWords = [];
    similarIds = { ids: [] };
    idsFound = [];
    foundInMainInfo = 0;
    highestValue = 0;


    const arrayInput = defaultFunctions.treatString(field + ' ' + filterByValue, true);
    generate.dataset.array.forEach(object => {
        similarsWords = similar.findSimilarMatches(arrayInput, object.tags);
        if (similarsWords[0]) {
            compareWordsWithTags(object, field, filterByValue);
        }
    });

    similarIds.ids = fill.fillArrayOfIds(idsFound, highestValue);
    res = gets.getObjectBySimilarIds(similarIds.ids);
    if (res.length > 0) {
        return createCopyFromArray(res, false);
    } else if (all == true) {
        return createCopyFromArray(generate.dataset.array, true);
    } else {
        return { message: 'NOT_FOUND', result: [] };
    }
}

function compareWordsWithTags(object, field, filterByValue) {
    similarsWords.forEach(word => {
        object.tags.forEach(tag => {
            if (metaphone.compare(tag, word)) {
                if (metaphone.compare(tag, filterByValue)) {
                    mainInfoFromObject = defaultFunctions.transformStringInArray(filterByValue);
                    idsFound.push(object.id);
                    object.totalSearchesFound--;
                } else if (field) {
                    mainInfoFromObject = defaultFunctions.transformStringInArray(field);
                }
                if (defaultFunctions.similarStrings(word.toString(), mainInfoFromObject, 0.95)) {
                    foundInMainInfo++;
                    object.totalSearchesFound++;
                }
                object.totalSearchesFound++;
            }
        });
        if (object.totalSearchesFound > highestValue) {
            highestValue = object.totalSearchesFound;
        }
    });
    return similarsWords;
}

function findLatestSearchedIds() {
    return similarIds;
}

function createCopyFromArray(array, notfound) {
    const res = {
        message: 'OK',
        result: []
    };
    if (notfound) {
        res.message = 'NOT_FOUND'
    }
    const copy = [];
    array.forEach(item => {
        const obj = {...item };
        delete obj.tags;
        delete obj.totalSearchesFound;
        copy.push(obj);
    })
    res.result = copy;
    return res;
}


module.exports.findLatestSearchedIds = findLatestSearchedIds;
module.exports.doSearch = doSearch;