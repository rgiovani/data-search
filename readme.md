# Data-search-js  1.1.7
#### This is a library that aims to perform a search for data in an array of objects. The parameter for such a search is a manual search for a user in a search bar.

<br/>

### **Check the dependencies:**

- https://www.npmjs.com/package/data-search

##### **Commands**

##### - npm install data-search
##### - yarn add data-search (recommended)

<br/>

#####

#
## **Dataset**
#### **The first step is to generate the data set.**

**To generate the data set it is necessary to pass an object** with some attributes.


>`{`

> **`array : [{}]` array of objects**.

> **`wordSize : number` size of the words** you want to filter.

> **`nameId : string` name of the object ID field**

> **`attributes: [string]` name of the attributes** you want to filter **in array format.**

>` }`

<br/>
<br/>

> Code:
```
import { dataSetGenerate } from 'data-search';

const myArray = [{
        id: 1,
        title: 'Lorem ipsum dolor sit amet.',
        card: {
            description: 'Nullam sollicitudin justo.'
        },
    },
    {
        id: 2,
        title: 'Morbi condimentum lobortis nec.',
        card: {
            description: 'consectetur at pharetra non, pharetra sed massa..'
        }
    }
]

const result = dataSetGenerate({
    array: myArray,
    wordSize: 2,
    nameId: 'id',
    attributes: ['title', 'description']
})

console.log(result)
``` 
> output:
```
[
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet.',
    card: { description: 'Nullam sollicitudin justo.' },
    totalSearchesFound: 0,
    tags: [
      'lorem',
      'ipsum',
      'dolor',
      'sit',
      'amet',
      'nullam',
      'sollicitudin',
      'justo'
    ]
  },
  {
    id: 2,
    title: 'Morbi condimentum lobortis nec.',
    card: {
      description: 'consectetur at pharetra non, pharetra sed massa..'
    },
    totalSearchesFound: 0,
    tags: [
      'morbi',       'condimentum',
      'lobortis',    'nec',
      'consectetur', 'at',
      'pharetra',    'non',
      'sed',         'massa'
    ]
  }
]
```
- The result will be an array of objects where, for each object in that array, an attribute called 'tags' will be added, which is an array with the filtered attribute values. 
- These tags will be used by the search functionality.

#
## **Search**
#### **The second step is to use the search function.**



#### So let's say you want to search for one of those objects. For this you type a text in the search function, this search can result in the return of one or more objects.

<br/>

> Code:
```
const result2 = search('i need morbi');
console.log(result2);
```

<br/>


> Output:
```
[
  {
    id: 2,
    title: 'Morbi condimentum lobortis nec.',
    card: {
      description: 'consectetur at pharetra non, pharetra sed massa..'
    },
    totalSearchesFound: 0,
    tags: [
      'morbi',       'condimentum',
      'lobortis',    'nec',
      'consectetur', 'at',
      'pharetra',    'non',
      'sed',         'massa'
    ]
  }
]
```
<br/>
<br/>
#### Next releases:

##### working on sorting and new functions to facilitate the search for objects.

