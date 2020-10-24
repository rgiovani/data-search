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

function doSearch(field, priorityAttribute) {
    let res;
    mainInfoFromObject = [];
    similarsWords = [];
    similarIds = { ids: [] };
    idsFound = [];
    foundInMainInfo = 0;
    highestValue = 0;
    if (!create.attributeBox.items.includes(priorityAttribute)) {
        priorityAttribute = field;
    }
    const arrayInput = defaultFunctions.treatString(field, true);
    generate.dataset.array.forEach(object => {
        similarsWords = similar.findSimilarMatches(arrayInput, object.tags);
        if (similarsWords[0]) {
            compareWordsWithTags(object, priorityAttribute);
        }
    });

    similarIds.ids = fill.fillArrayOfIds(idsFound, highestValue);
    res = gets.getObjectBySimilarIds(similarIds.ids);
    if (res) {
        const copy = [];
        res.forEach(item => {
            const obj = {...item };
            delete obj.tags;
            delete obj.totalSearchesFound;
            copy.push(obj);
        })

        return copy;
    } else {
        return [];
    }
}

function compareWordsWithTags(object, priorityAttribute) {
    similarsWords.forEach(word => {
        object.tags.forEach(tag => {
            if (metaphone.compare(tag, word)) {
                if (object[priorityAttribute]) {
                    mainInfoFromObject = defaultFunctions.transformStringInArray(object[priorityAttribute]);
                } else if (priorityAttribute) {
                    mainInfoFromObject = defaultFunctions.transformStringInArray(priorityAttribute);
                }

                if (defaultFunctions.similarStrings(word.toString(), mainInfoFromObject, 0.95)) {
                    idsFound.push(object.id);
                    foundInMainInfo++;
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


module.exports.findLatestSearchedIds = findLatestSearchedIds;
module.exports.doSearch = doSearch;