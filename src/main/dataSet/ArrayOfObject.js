import { mainAttributes } from './verifyAtribute.js';

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
        this._name = name;
    }
};

function create(obj, idName, size, params) {
    obj.tags = [];
    Object.keys(obj).forEach((attribute) => {
        mainAttributes(obj, attribute, idName, size, params);
    });
    obj.tags = tmp.tags;

    return obj;
}

const _collection = collection;
export { _collection as collection };
const _tmp = tmp;
export { _tmp as tmp };
const _create = create;
export { _create as create };