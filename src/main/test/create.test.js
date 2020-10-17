import { collection, create } from '../dataSet/create.js';

const myObj = {
    id: 1,
    type: 'Sports car',
    make: {
        name: 'BMW',
        model: {
            serie: '3 Series'
        },
        details: [
            'Daytime running lights are shallow "U" shapes, emphasizing the four-headlamp design.',
            'A strong "muscle" line in the body side about halfway down the door skins implies strength.', {
                alo: 'kk'
            }
        ],
        age: ['2018', '2019']

    },
    colors: ['black', 'white']

};

describe("check if was created an object with the following tags", () => {
    test('it should return tag field with \'sports\' and \'car\'. ', () => { //type
        const res = create(myObj, 'id', 2, ['type']);
        expect(res.tags.includes('sports')).toBe(true);
        expect(res.tags.includes('car')).toBe(true);
    })

    test('it should return empty tag. \'regular\' does not exist in the tag. ', () => {
        const res = create(myObj, 'id', 2, ['type']);
        expect(res.tags.includes('regular')).toBe(false);
    })

    test('it should return tag field with \'bmw\'. ', () => { //make.name
        const res = create(myObj, 'id', 2, ['name']);
        expect(res.tags.includes('bmw')).toBe(true);
    })

    test('it should return empty tag when try to access object attributes', () => {
        const res = create(myObj, 'id', 2, ['make']); //make
        expect(res.tags.length).toBe(0);
    })

    test('it should return empty tag when try to access object attributes inside others objects.', () => { //model
        const res = create(myObj, 'id', 2, ['model']);
        expect(res.tags.length).toBe(0);
    })

    test('it should return tag field with \'3\' and \'series\'. ', () => { //make.model.serie
        const res = create(myObj, 'id', 0, ['serie']);
        expect(res.tags.includes('3')).toBe(true);
        expect(res.tags.includes('series')).toBe(true);
    })

    test('it should return tag field with words longer than 7 letters. ', () => { //make.details
        const res = create(myObj, 'id', 7, ['details']);
        expect(res.tags.length).toBe(3);
    })

    test('it should return tag field with \'black\' and \'white\'. ', () => { //colors
        const res = create(myObj, 'id', 2, ['colors']);
        expect(res.tags.includes('black')).toBe(true);
        expect(res.tags.includes('white')).toBe(true);
    })

    test('it should return \'collection.name\' is colors. ', () => { //colors
        collection.name = 'colors';
        collection.name = undefined;
        expect(collection.name).toBe('colors');
    })

})