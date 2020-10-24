const defaultFunctions = require('../../utils/shared/functions/defaultFunctions.js');
const validateTypes = require('../../utils/shared/functions/validateTypes.js');
const verify = require('./verifyAtribute.js');

let attributeBox = {
    _items: [],
    get items() {
        return this._items;
    },
    set items(items) {
        this._items = items;
    },
    add: function (obj, attribute) {
        if (validateTypes.isString(obj[attribute]) && isNaN(Number(attribute))) {
            this._items.push(attribute);
        }
    }
}

let tmp = {
    _tags: [],
    get tags() {
        return this._tags;
    },
    set tags(tags) {
        this._tags = tags;
    }
};

let collection = {
    _name: undefined,
    get name() {
        return this._name;
    },
    set name(name) {
        this._name = (name) ? name : this._name;
    }
};

function create(obj, idName, size, params) {
    attributeBox.items = [];
    obj.totalSearchesFound = 0;
    obj.tags = [];
    Object.keys(obj).forEach((attribute) => {
        verify.mainAttributes(obj, attribute, idName, size, params);
    });
    obj.tags = tmp.tags;
    tmp.tags = [];
    attributeBox.items = defaultFunctions.removeRedundancyFromStringArray(attributeBox.items, 0);
    return obj;
}

function getNameCollection() {
    return collection.name;
}

function setNameCollection(name) {
    collection.name = name;
}

module.exports.create = create;
module.exports.tmp = tmp;
// module.exports.getNameCollection = getNameCollection;
// module.exports.setNameCollection = setNameCollection;
module.exports.collection = collection;
module.exports.attributeBox = attributeBox;