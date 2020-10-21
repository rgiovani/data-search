# **Data-search-js 1.2.5**

<img src="./icon.png" width="250">

<br/>

This is a library that aims to perform a search for data in an array of objects. The parameter for such a search is a manual search for a user in a search bar.

## **Summary**


  - [Dataset](#dataset)
    - [Using getDataset](#using-getDataset)
  - [Search](#search)
    - [Priority attribute](#priority-attribute)
    - [Tips to use the priority attribute](#tip-to-use-the-priority-attribute)
    - [Search distance](#search-distance)
      - [Using getDistance](#using-getdistance)
      - [Using setDistance](#using-setdistance)
      - [Using resetDistance](#using-resetdistance)
  - [Check the dependencies](#check-the-dependencies)
  - [Next releases](#next-releases)


## **Commands**

  - npm install data-search
  - yarn add data-search (recommended)

<br/>

  **This library use es6.**

  *In your package.json use:*
      "type": "module"

<br/>
<br/>

## **Dataset**


**The first step is to generate the data set.**

To generate the data set it is necessary to pass an object with some attributes. 

I call this object: 'main'.

>`{`

> **`array : [{}]` // array of objects (the id field must exist on each object).**.

> **`wordSize : number` // size of the words** you want to filter.

> **`nameId : string` // name of the object ID field.**

> **`attributes: [string]` // name of the attributes** you want to filter **in array format.**

>` }`

<br/>

> Code:
```
import { dataSetGenerate, search } from 'data-search';

const myArray = [{
        id: 1,
        title: 'Lord of the Rings',
        genre: 'ADVENTURE'
    },
    {
        id: 2,
        title: 'Fury',
        genre: 'WAR'
    }
]

const result = dataSetGenerate({
    array: myArray,
    wordSize: 2,
    nameId: 'id',
    attributes: ['title', 'genre']
})

console.log(result)
``` 
> Output:
```
[
  {
    id: 1,
    title: 'Lord of the Rings',
    genre: 'ADVENTURE',
    totalSearchesFound: 0,
    tags: [ 'lord', 'of', 'the', 'rings', 'adventure' ]
  },
  {
    id: 2,
    title: 'Fury',
    genre: 'WAR',
    totalSearchesFound: 0,
    tags: [ 'fury', 'war' ]
  }
]
```
- The result will be an array of objects where, for each object in that array, an attribute called 'tags' will be added, which is an array with the filtered attribute values. 
- \'totalSearchesFound\' will also be added.
- Both attributes will be used as internal parameters by the search functionality.

### **Using getDataset**
- getDataset()
- This function returns an object with all the attributes of the dataset.
>`{`

> **`_array : [{}]` // array with the generated objects.**.

> **`createdAt : Date` // Data set creation date.**

> **`array: [Getter/Setter]` // getters and setters for the array**

>` }`

<br/>

> Code:
```
const info = getDataset(); 
console.log(info);
```
> Output:
```
{
  _array: [
    {
      id: 1,
      title: 'Lord of the Rings',
      genre: 'ADVENTURE',
      totalSearchesFound: 0,
      tags: [Array]
    },
    {
      id: 2,
      title: 'Fury',
      genre: 'WAR',
      totalSearchesFound: 0,
      tags: [Array]
    }
  ],
  createdAt: 2020-10-21T13:13:05.238Z,
  array: [Getter/Setter]
}
```

<br/>
<br/>

## **Search**

**The second step is to use the search function.**

So let's say you want to search for one of those objects. For this you type a text in the search function, this search can result in the return of one or more objects.

<br/>

> Code:
```
const result2 = search('I want to watch fury');
console.log(result2);
```
> Output:
```
[
  {       
    id: 2,
    title: 'Fury',
    genre: 'WAR',
    totalSearchesFound: 0,
    tags: [ 'fury', 'war' ]
  }
]
```

<br/>
<br/>

## **Priority attribute**

It is used when an object does not have enough information to be returned by the first parameter of the search function, but it needs to be returned, because the object has an attribute and this attribute has the necessary value for the return.

<br/>

> Code:
```
{
  id: 1,
  title: 'Lord of the Rings',
  genre: 'ADVENTURE'
},
{
  id: 2,
  title: 'Fury',
  genre: 'WAR'
}

search('lords ring war');
```

> Output:
```
[
  {
    id: 1,
    title: 'Lord of the Rings',
    genre: 'ADVENTURE',
    totalSearchesFound: 0,
    tags: [ 'lord', 'of', 'the', 'rings', 'adventure' ]
  }
]
```
  Note that the **return will only be from the object with id 1, this happens because the object with id 1 has more information that matches what you are looking for**. However, if you still think that the function should return the object with id 2 because the object contains 'war' and you also typed 'war' in the search, then, **you must tell the search what attribute it should treat as priority**, whenever the search function finds a value (in the attribute defined as priority) that matches exactly what you typed, this object will be returned along with the others:

<br/>

> Code: *in the second parameter of the search() function put the name of your attribute*
```
search('lords ring war', 'genre');
```
> Output:
```
[
  {
    id: 1,
    title: 'Lord of the Rings',
    genre: 'ADVENTURE',
    totalSearchesFound: 0,
    tags: [ 'lord', 'of', 'the', 'rings', 'adventure' ]
  },
  {
    id: 2,
    title: 'Fury',
    genre: 'WAR',
    totalSearchesFound: 0,
    tags: [ 'fury', 'war' ]
  }
]
```
Now note that both objects have been returned.
Even if the second object does not have all the information you typed in, it still has 'war' in the priority attribute 'genre' so now it is returned.

<br/>

## **Tip to use the priority attribute**

- The idea for the use of this priority attribute could be in the case of your application has search not only by field but also by filters, in the case of filters of genre of films (adventure, action etc...). 
- So besides waiting for the user to type something, the application can also wait for him to pass a filter. 
- You then concatenate the values: field + ' ' + filterName, pass the result of the concatenation in the search and say which attribute you are prioritizing.
- Then if he writes 'lords ring' in the search bar and selects 'war' in the filter the search would look something like this:
```
const res = 'lords ring' + ' ' + 'war';
search( res, 'genre');
```
- The result would be the objects searched by typing but with priorities in the filters.

## **Search distance**

- The search uses a distance system to find the results. 
- This distance is delimited between two ends called 'min' and 'max'.
  - As an attempt to find the best word combinations, the search always uses the value of 'max' first, to verify that the words in the object's array of tags are closely to what was typed, making it possible to verify that what was typed is identical to some tag of an object.
  - If nothing is found, the search uses the value between 'max' and 'min' to find the words (typed in the search) that most closely match the object's tag array.
  - At this point the closer the 'min' is to 'max' or the 'max' to 'min', the lower the tolerance for the words in the search and the greater the probability of finding an object similar (or not) to the one requested .

### **Using setDistance**
- setDistance(min,max)
- This function allows changing the maximum and minimum tolerance that the search needs to bring results.
- This function accepts only fractional numeric values between 0 and 1.

> Code:
```
const obj = [{
        id: 1,
        title: 'Lord of the Rings',
        genre: 'ADVENTURE'
    },
    {
        id: 2,
        title: 'Fury',
        genre: 'WAR'
    }
]

dataSetGenerate({
    array: obj,
    attributes: ['title', 'genre']
});

console.log(search('fu'));
```
> Output:
```
[]
```
- note that the search did not find 'fu' because 'fu' is a word that is not considered to be similar to any tag in my array of objects. 
- It is a word that does not fit the tolerance of the values of 'max' or between 'min' and 'max' in relation to the tags of each object.
- In order to capture it, we can increase the 'min' value by bringing 'min' close to the 'max' and decreasing the search tolerance for wrong words.

> Code:
```
setSearchDistance(0.60, 0.90);
console.log(search('fu'));
```
> Output:
```
[
  {
    id: 2,
    title: 'Fury',
    genre: 'WAR',
    totalSearchesFound: 0,
    tags: [ 'fury', 'war' ]
  }
]
```
- Now the search tolerance is only 0.3 (0.9-0.6), increasing the possibility of finding objects even with wrong words or in half.
[RECOMMENDED] - For a more accurate search, i recommend using 'max' as being greater than 8, and working on 'min' with values between 2 to 7.5.

### **Using getDistance**
- getDistance()
- To find out what the 'min' and 'max' values are, use 'getdistance', this function returns an object with the updated 'min' and 'max' values:

> Code:
```
console.log(getSearchDistance());
```
> Output:
```
{ min: 0.3, max: 0.85 }
```

### **Using resetDistance**
- resetDistance()
- Resets the 'min' and 'max' values to the default values.
'min' = 0.3.
'max' = '0.85.

## **Check the dependencies:**
  - https://www.npmjs.com/package/data-search
  
## **Next releases:**

*Working on sorting and new functions to facilitate the search for objects.*

