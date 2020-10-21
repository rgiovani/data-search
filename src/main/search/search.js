import { similarStrings, treatString } from '../../utils/shared/functions/defaultFunctions.js';
import { getObjectBySimilarIds } from './getObjectBySimilarIds.js';
import { findSimilarMatches } from './findSimilarMatches.js';
import { fillArrayOfIds } from './fillArrayOfIds.js';
import { dataset } from '../dataSet/generateDataset.js'
import natural from 'natural';
import { attributeBox } from '../dataSet/create.js';

const metaphone = natural.Metaphone;

let mainInfoFromObject = [];
let similarsWords = [];
const similarIds = { message: 'OK', ids: [] };
const idsFound = [];
let foundInMainInfo = 0;
let highestValue = 0;

export function doSearch(field, priorityAttribute) {
    let res;

    if (!attributeBox.items.includes(priorityAttribute)) {
        priorityAttribute = attributeBox.items[0];
    }

    const arrayInput = treatString(field, true);
    dataset.array.forEach(object => {
        similarsWords = findSimilarMatches(arrayInput, object.tags);
        if (similarsWords[0]) {
            compareWordsWithTags(object, priorityAttribute);
        }
    });

    similarIds.ids = fillArrayOfIds(idsFound, highestValue);
    similarIds.message = (similarIds.ids && similarIds.ids.length > 0) ? 'OK' : 'EMPTY';
    res = getObjectBySimilarIds(similarIds.ids);
    if (res)
        return res;
    else
        return [];
}

function compareWordsWithTags(object, priorityAttribute) {
    similarsWords.forEach(word => {
        object.tags.forEach(tag => {
            if (metaphone.compare(tag, word)) {
                mainInfoFromObject = [];
                mainInfoFromObject.push(object[priorityAttribute]);
                if (similarStrings(word.toString(), mainInfoFromObject, 0.95)) {
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

export function findLatestSearchedIds() {
    return similarIds;
}