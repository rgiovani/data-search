# Data-search-js
This is a library that aims to perform a search for data in an array of objects. The parameter for such a search is a manual search for a user in a search bar.

**Check the dependencies:**

- https://www.npmjs.com/package/data-search

**Commands**

- npm install data-search
- yarn add data-search (recommended)

**Version 1.1.1:**
- **To generate the data set it is necessary to pass an object** with some attributes.

>`{`

> **`array : [{}]` array of objects**.

> **`wordSize : number` size of the words** you want to filter.

> **`nameId : string` name of the object ID field**

> **`attributes: [string]` name of the attributes** you want to filter **in array format.**

>` }`
```
const data = require('data-search');

const myArray = [{
    id: 1,
    title: 'This is my title',
}]

const result = data.dataSetGenerate({
    array: myArray,
    wordSize: 2,
    nameId: 'id',
    attributes: ['title']
})

console.log(result)
``` 
> result:
```
[ { id: 1, title: 'This is my title', tags: [ 'this', 'title' ] } ]
```
- The result will be an array of objects where, for each object in that array, an attribute called 'tags' will be added, which is an array with the filtered attribute values. 
- These tags will be used by the search functionality(implementing).
