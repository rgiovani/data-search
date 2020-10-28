# **Data-search-js 1.3.8**

<img src="./icon.png" width="250">

<br/>

This is a library that aims to perform a search for data in an array of objects. The parameter for such a search is a manual search for a user in a search bar.

## **Summary**


  - [Dataset](#dataset)
    - [Ignoring words](#ignoring-words)
    - [Using getDataset](#using-getdataset)
  - [Search](#search)
    - [And when nothing is found?](#and-when-nothing-is-found)
    - [Priority attribute](#priority-attribute)
    - [Tips to use the priority attribute](#tip-to-use-the-priority-attribute)
    - [Search distance](#search-distance)
      - [Using getDistance](#using-getdistance)
      - [Using setDistance](#using-setdistance)
      - [Using resetDistance](#using-resetdistance)
      - [Using getLatestSearchedIds](#using-getlatestsearchedids)
      
  - [Check the dependencies](#check-the-dependencies)
  - [Next releases](#next-releases)


## **Commands**

  - npm install data-search
  - yarn add data-search (recommended)
  
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

> **`ignoreInTags: [string]` // The tags ignore any words in the object that look like any words in this array.**

>` }`

<br/>

``` dataSetGenerate(main) ```

<br/>

> Code:
```
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

## **Ignoring words**
- If a word is not wanted when generating the dataset, you can ignore it, further refining the search results and leaving it as you need it.
- To do this, simply pass in the string array \'ignoreInTags\' which words you want the tags to ignore.
- The tags ignore any words in the object that look like any words in this array.

> Code
```
const myArray = [{
    id: 1,
    title: 'Lord of the Rings',
    genre: 'ADVENTURE'
}]

const result = dataSetGenerate({
    array: myArray,
    attributes: ['title', 'genre'],
    ignoreInTags: ['rings', 'lord']
})

console.log(result)
```

> Output
```
[
  {
    id: 1,
    title: 'Lord of the Rings',
    genre: 'ADVENTURE',
    totalSearchesFound: 0,
    tags: [ 'of', 'the', 'adventure' ]
  }
]
```
- As you can see, my object's tags don't have 'rings' and 'lord'

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

``` search(datasetArray, input, all, filterByValue) ```

For this, in each search() it is necessary to pass:
- The result of the dataSetGenerate function is passed in the first parameter, 
this will be the basis for the search.
- In the second parameter, what was entered by the user is passed.
**It is not necessary to pass, but if you need:**
- In the third parameter, it is passed if the function will return everything when no object is found(true or false).
- In the fourth parameter of the search() function, place the name of the present value within the attribute that will be treated as a priority.

**IMPORTANT:** The result of this function (datasetGenerate) will always be an array of objects.

<br/>

> Code:
```
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

const datasetResult = dataSetGenerate({
    array: myArray,
    attributes: ['title', 'genre']
})

const result2 = search(datasetResult, 'I want to watch fury');
console.log(result2);
```
> Output:
```
{ 
  message: 'OK', 
  result: [ 
    { 
      id: 2, 
      title: 'Fury', 
      genre: 'WAR' 
    } 
  ] 
}
```

<br/>
<br/>

## **And when nothing is found?**
It is possible to define that everything generated by the dataset is returned when nothing is found.
The \'all\' parameter is of the boolean type so when it is:
- **true:** changes the return to an array with all objects from dataset.
- **false:** changes the return to an empty array.

**IMPORTANT:** These returns use the \'all\' parameter when nothing is found by the search. But don't worry, it is not necessary to pass this parameter if you don't want to, it will always be false if it is not passed true.

> Code:
```
  console.log(search(datasetResult, 'comedy', true));
```
> Output:
```
{
  message: 'NOT_FOUND',
  result: [
    { id: 1, title: 'Lord of the Rings', genre: 'ADVENTURE' },
    { id: 2, title: 'Fury', genre: 'WAR' }
  ]
}
```

## **Filter by value in the attribute**

It is used when an object does not have enough information to be returned by the first parameter of the search function, but it needs to be returned, because the object has an attribute and this attribute has the necessary value for the return.

<br/>

> Code:
```
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

const datasetResult = dataSetGenerate({
    array: myArray,
    attributes: ['title', 'genre']
})

console.log(search(datasetResult,'fury war adventure'));
```

> Output:
```
{ 
  message: 'OK', 
  result: [ 
    { 
      id: 2, 
      title: 'Fury', 
      genre: 'WAR' 
    } 
  ] 
}
```
  Note that the **return will only be from the object with id 2, this happens because the object with id 2 has more information that matches what you are looking for**. However, if you still think that the function should return the object with id 1 because the object contains 'adventure' and you also typed 'adventure' in the search, then, **you must tell the search what the value of the attribute it should treat as priority**, whenever the search function finds a value that matches exactly what you typed, this object will be returned along with the others:

<br/>

> Code: *in the fourth parameter of the search() function put the name of the present value inside the attribute*
```
console.log(search(datasetResult,'fury war adventure', false, 'adventure'));
```
> Output:
```
{
  message: 'OK',
  result: [
    { id: 2, title: 'Fury', genre: 'WAR' },
    { id: 1, title: 'Lord of the Rings', genre: 'ADVENTURE' }
  ]
}
```
Now note that both objects have been returned.
Even if the first object does not have all the information you typed in, it still has 'ADVENTURE' in the genre 'title' so now it is returned.

<br/>

## **Tip to use the 'Filter by value'**

- The idea for the use of this priority attribute could be in the case of your application has search not only by field but also by filters, in the case of filters of genre of films (adventure, action etc...). 
- So besides waiting for the user to type something, the application can also wait for him to pass a filter. 
- Then if he writes 'lords ring' in the search bar and selects 'war' in the filter the search would look something like this:
```
const res = 'lords ring';
search(datasetResult, res, false, 'war');
```
- The result would be the objects searched by typing but with priorities in the filters.

## **Search distance**

- The search uses a distance system to find the results. 
- This distance is delimited between two ends called 'min' and 'max'.
  - As an attempt to find the best word combinations, the search always uses the value of 'max' first, to verify that the words in the object's array of tags are closely to what was typed, making it possible to verify that what was typed is identical to some tag of an object.
  - If nothing is found, the search uses the value between 'max' and 'min' to find the words (typed in the search) that most closely match the object's tag array.
  - At this point the closer the 'min' is to 'max' or the 'max' to 'min', the lower the tolerance for the words in the search and the greater the probability of finding an object similar (or not) to the one requested.

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

const dataSetResult = dataSetGenerate({
    array: obj,
    attributes: ['title', 'genre']
});

console.log(search(dataSetResult, 'fu'));
```
> Output:
```
[]
```
- note that the search did not find 'fu' because 'fu' is a word that is not considered to be similar to any tag in my array of objects. 
- It is a word that does not fit the tolerance of the values of 'max' or between 'min' and 'max' in relation to the tags of each object.
- In order to capture it, we can increase the 'min' value by bringing 'min' close to the 'max' and increasing the search tolerance for wrong words.

> Code:
```
setSearchDistance(0.60, 0.90);
console.log(search(dataSetResult, 'fu'));
```
> Output:
```
{ 
  message: 'OK', 
  result: [ 
    { 
      id: 2, 
      title: 'Fury', 
      genre: 'WAR' 
    } 
  ] 
}
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

### **Using getLatestSearchedIds**
- getLatestSearchedIds()
- returns an object with an array of ids found by the search.

> Code:
```
getLatestSearchedIds();
```
> Code:
```
{ ids: [ 2 ] }
```

## **Check the dependencies:**
  - https://www.npmjs.com/package/data-search
  
## **Next releases:**

*Working on sorting and new functions to facilitate the search for objects.*

