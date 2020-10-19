  # Data-search-js  1.2.1

  <img src="./icon.png" width="250">
  
  <br/>
  
  This is a library that aims to perform a search for data in an array of objects. The parameter for such a search is a manual search for a user in a search bar.

  **Check the dependencies:**
    - https://www.npmjs.com/package/data-search
  
  **Commands**

    - npm install data-search
    - yarn add data-search (recommended)

  <br/>

    **This library use es6.**

    *In your package.json use:*
        "type": "module"

  <br/>
  <br/>

  ## Summary

  - [Dataset](#dataset)
  - [Search](#search)


  ## Dataset
  

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
  - These tags will be used by the search functionality.

<br/>
<br/>

  ## Search
  
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

  ## Priority attribute
  -
  
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

 **Tip to use the priority attribute**

 - The idea for the use of this priority attribute could be in the case of your application has search not only by field but also by filters, in the case of filters of genre of films (adventure, action etc...). 
 - So besides waiting for the user to type something, the application can also wait for him to pass a filter. 
 - You then concatenate the values: field + ' ' + filterName, pass the result of the concatenation in the search and say which attribute you are prioritizing.
 - Then if he writes 'lords ring' in the search bar and selects 'war' in the filter the search would look something like this:
```
 const res = 'lords ring' + ' ' + 'war';
 search( res, 'genre');
```
 - The result would be the objects searched by typing but with priorities in the filters.


 **Next releases:**

 *Working on sorting and new functions to facilitate the search for objects.*

