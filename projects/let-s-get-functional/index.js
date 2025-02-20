// #!/usr/bin/env node

'use strict';

var customers = require('./data/customers.json');
var _ = require('underbar');

/**
 * 1. Import your lodown module using the require() method,
 *    using the string 'lodown-<my-username>', or whatever
 *    name with which you published your npm lodown project.
 *
 * 2. Solve all problems as outlined in the README.
 *
 * 3. We started the first one for you as an example! Make the rest in that style.
 *
 * 4. To test your work, run the following command in your terminal:
 *
 *    npm start --prefix ./projects/let-s-get-functional
 *
 *    IMPORTANT: Make sure you replace <YOUR_GITHUB_FOLDER with your actual github folder name that is in your workspace.
 */

var maleCount = function(array) {
  return array.filter(customer => customer.gender === 'male').length;
};

var femaleCount = function(array) {
  return array.reduce((acc, curr) => {
    if (curr.gender === 'female') {
      acc++;
    }
    return acc;
  }, 0);
};

var oldestCustomer = function(array) {
  const old = array.reduce((acc, curr) => {
    if (acc.age < curr.age) {
      return curr;
    } else {
      return acc;
    }
  });
  return old.name;
};

var youngestCustomer = function(array) {
  const young = array.reduce((acc, curr) => {
    if (acc.age < curr.age) {
      return acc;
    } else {
      return curr;
    }
  });

  return young.name;
};

var averageBalance = function(array) {
  // get total of customers balance
  // calculate average -> total / array.length
  // return average

  let total = array.reduce((acc, curr) => {
    let rightBalance = curr.balance.replace(/[$, ,]/g, "");
    // console.log('rightBalance: ', rightBalance);
    return acc + parseFloat(rightBalance);
  }, 0);

  // console.log('TOTAL: ', total);
  return (total / array.length);
};

// array = array of customer objects
// letter = whatever letter we are trying to find
// output number
var firstLetterCount = function(array, letter) {
  let firstLetterOccurences = array.reduce((acc, curr) => {
    if (curr.name[0].toLowerCase() === letter.toLowerCase()) {
      acc += 1;
    }
    return acc;
  }, 0)
  return firstLetterOccurences;
};

// array = array of customer objects
// customer = given customer = "Doris Smith"
// letter = whatever letter of the customer's friend we are trying to find = "B"
// output = number
var friendFirstLetterCount = function(array, customer, letter) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].name === customer) {
      let customersFriendFirstLetter = array[i].friends.reduce((acc, curr) => {
        if (curr.name[0].toLowerCase() === letter.toLowerCase()) {
          acc += 1;
        }
        return acc;
      }, 0)
      return customersFriendFirstLetter;
    }
  }
};

// array = array of customer objects
// name = name of the target friend
// output = array
var friendsCount = function(array, name) {
  // we need access to the array's indexes
  // each index in the array is an object
  // we need access to the friends key's value which is an array of objects
  // check if any of the name properties === name
  // if it does, push the actual customer's name to the acc
  let customerFriends = array.reduce((acc, curr) => {
    if (curr.friends.some(obj => obj.name === name)) {
      acc.push(curr.name)
    }
    return acc;
  }, [])
  return customerFriends;
};

// array = array of customer objects
// output = array of top 3 tags
var topThreeTags = function(array) {
  // create empty object
  let tagCount = {};
  // loop through array
  for (let i = 0; i < array.length; i++) {
    // loop through tags
    for (let j = 0; j < array[i].tags.length; j++) {
      // set each tag as a key in empty object if its the first time seeing it
      // increment each key's value every single time we hit the occurrence
      if (tagCount.hasOwnProperty(array[i].tags[j])) {
        tagCount[array[i].tags[j]] += 1;
      } else {
        tagCount[array[i].tags[j]] = 1;
      }
    }
  }
  // initialize an empty array
  let tagCountArr = [];
  // iterate the tagCount object and push a tuple (mini arr) the first index is the tag and the second is the number
  // ex:  [[cupidatat, 1], [do, 2]]
  for (let tags in tagCount) {
    tagCountArr.push([tags, tagCount[tags]]);
  }
  // sort the array
  const sortedArr = tagCountArr.sort((a, b) => b[1] - a[1]);
  // initialize a new empty array
  const output = [];
  for (let i = 0; i < 3; i++) {
    output.push(sortedArr[i][0])
  }
  return output;
};

// array = array of customer objects
// output = object where the genders are the keys and the count is the value
// USE REDUCE
var genderCount = function(array) {
  const genderObj = array.reduce((acc, curr) => {
    if (acc.hasOwnProperty(curr.gender)) {
      acc[curr.gender] += 1
    } else {
      acc[curr.gender] = 1;
    }
    return acc;
  }, {})
  return genderObj;
};

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// here, export any references you need for tests //
module.exports.maleCount = maleCount;
module.exports.femaleCount = femaleCount;
module.exports.oldestCustomer = oldestCustomer;
module.exports.youngestCustomer = youngestCustomer;
module.exports.averageBalance = averageBalance;
module.exports.firstLetterCount = firstLetterCount;
module.exports.friendFirstLetterCount = friendFirstLetterCount;
module.exports.friendsCount = friendsCount;
module.exports.topThreeTags = topThreeTags;
module.exports.genderCount = genderCount;
