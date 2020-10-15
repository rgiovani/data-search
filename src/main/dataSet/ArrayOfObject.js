import { mainAttributes } from './verifyAtribute.js';

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
        this._name = name;
    }
};

export function create(obj, idName, size, params) {
    obj.tags = [];
    Object.keys(obj).forEach((attribute) => {
        mainAttributes(obj, attribute, idName, size, params);
    });
    obj.tags = tmp.tags;
    tmp.tags = [];
    return obj;
}