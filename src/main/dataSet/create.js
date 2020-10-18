import { removeRedundancyFromStringArray } from '../../utils/shared/functions/defaultFunctions.js';
import { isString } from '../../utils/shared/functions/validateTypes.js';
import { mainAttributes } from './verifyAtribute.js';

export let attributeBox = {
    _items: [],
    get items() {
        return this._items;
    },
    set items(items) {
        this._items = items;
    },
    add: function(obj, attribute) {
        if (isString(obj[attribute]) && isNaN(Number(attribute))) {
            this._items.push(attribute);
        }
    }
}

export const tmp = {
    _tags: [],
    get tags() {
        return this._tags;
    },
    set tags(tags) {
        this._tags = tags;
    }
};

export const collection = {
    _name: undefined,
    get name() {
        return this._name;
    },
    set name(name) {
        this._name = (name) ? name : this._name;
    }
};

export function create(obj, idName, size, params) {
    attributeBox.items = [];
    obj.totalSearchesFound = 0;
    obj.tags = [];
    Object.keys(obj).forEach((attribute) => {
        mainAttributes(obj, attribute, idName, size, params);
    });
    obj.tags = tmp.tags;
    tmp.tags = [];
    attributeBox.items = removeRedundancyFromStringArray(attributeBox.items, 0);
    return obj;
}