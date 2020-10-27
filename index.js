const validateType = require('./src/utils/shared/functions/validateTypes.js');
const { IsNotObjectError } = require('./src/utils/shared/errors/IsNotObject.error.js');
const { doSearch, findLatestSearchedIds } = require('./src/main/search/search.js');
const { IsNotStringError } = require('./src/utils/shared/errors/IsNotString.error.js');
const similar = require('./src/main/search/findSimilarMatches.js');
const dataset = require('./src/main/dataSet/generateDataset.js');

/**
 * This function generates a data set based on an array of objects. **ID field required on each object**.
 * @param {Object} main Main object with options.
 * @param {[object]} main.array Array of objects.
 * @param {string} main.nameId Name of the identification field in your objects. (**\'id\' by default**)
 * @param {number} main.wordSize Size of the words you want to filter to generate the tags. (**\'2\' by default**)
 * @param {[string]} main.attributes Name of the attributes on the objects you need to generate the tags.
 * @param {[string]} main.ignoreInTags The tags ignore any words in the object that look like any words in this array.
 * @return Array of objects with an array of tags on each object in the array.
 */
function dataSetGenerate(main) {

    try {
        if (!validateType.isObject(main)) {
            throw new IsNotObjectError('main')
        }
        return dataset.generate(main);
    } catch (e) {
        if (e.type && e.description)
            console.error(`\n[${e.type}] - ${e.description}`);
        else
            console.error(e.message)
    }
}

/**
 * This function uses user input to search for objects generated by the data set.
 * - by default, it takes the first attribute that is considered a string in the object.
 * - Ignores identifier (ID) attributes and take the next attribute.
 * @param  input User input in a search bar.
 * @param  all When nothing is found: --- (**false by default**) 
 * - [**true**] changes the return to an array with all objects from dataset.
 * - [**false**] changes the return to an empty array.
 * @param  filterByValue Value that the search will always give priority. (**\'empty string\' by default**)
 * @return Returns an array with the found objects. 
 */
function search(input, all, filterByValue) {
    try {
        if (all) {
            if (typeof all != 'boolean') {
                throw new Error('\'all\' cannot be different from boolean type.');
            }
        } else {
            all = false;
        }
        if (!validateType.isString(input)) {
            throw new IsNotStringError('input');
        }
        const field = (input) ? input : '';
        filterByValue = (filterByValue) ? filterByValue : '';
        return doSearch(all, field, filterByValue);
    } catch (e) {
        if (e.type && e.description) {
            console.error(`\n[${e.type}] - ${e.description}`);
        } else {
            console.error(e.message)
        }

    }
}

/**
 * This function returns an object with all the attributes of the dataset.
 */
function getDataset() {
    return dataset.findDataset();
}

/**
 * This function returns an object with the current values ​​of 'min' and 'max'.
 */
function getSearchDistance() {
    return similar.getMaxMinDistance();
}

/**
 * This function allows changing the maximum and minimum tolerance that the search needs to bring results.
 * The search result will be the max value or the distance value between 'max' and 'min'.
 * @param  min Minimum tolerance value. (**0.30 by default**).
 * @param  max Max tolerance value. (**0.85 by default**).
 */
function setSearchDistance(min, max) {
    similar.setMaxMinDistance(min, max);
}

/** 
 * This function resets the distance values ​​('min' and 'max') to the default values. 
 */
function resetDistance() {
    similar.resetMaxMin();
}

/**
 * This function returns an object with an array of ids found by the search.
 */
function getLatestSearchedIds() {
    return findLatestSearchedIds();
}

module.exports.resetDistance = resetDistance;
module.exports.setSearchDistance = setSearchDistance;
module.exports.getSearchDistance = getSearchDistance;
module.exports.getDataset = getDataset;
module.exports.search = search;
module.exports.dataSetGenerate = dataSetGenerate;
module.exports.getLatestSearchedIds = getLatestSearchedIds;