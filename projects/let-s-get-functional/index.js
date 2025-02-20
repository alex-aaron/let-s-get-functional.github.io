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
 *    npm start --prefix ./let-s-get-functional.github.io/projects/let-s-get-functional
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

var firstLetterCount = (array, letter) => {
  let firstLetterOccurrences = array.reduce((acc, curr) => {
    if (curr.name[0].toLowerCase() === letter.toLowerCase()) {
      acc += 1;
    }
    return acc;
  }, 0)
  return firstLetterOccurrences;
};;

var friendFirstLetterCount = (array, customer, letter) => {
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

var friendsCount = function(array, name) {
  let customerFriends = array.reduce((acc, curr) => {
    if (curr.friends.some(obj => obj.name === name)) {
      acc.push(curr.name)
    }
    return acc;
  }, [])
  return customerFriends;
};

var topThreeTags = function(array) {
  let tagCount = {};

  for (let i = 0; i < array.length; i++) {

    for (let j = 0; j < array[i].tags.length; j++) {
      
      if (tagCount.hasOwnProperty(array[i].tags[j])) {
        tagCount[array[i].tags[j]] += 1;
      } else {
        tagCount[array[i].tags[j]] = 1;
      }
    }
  }

  let tagCountArr = [];
  
  for (let tags in tagCount) {
    tagCountArr.push([tags, tagCount[tags]]);
  }
  
  const sortedArr = tagCountArr.sort((a, b) => b[1] - a[1]);
 
  const output = [];
  for (let i = 0; i < 3; i++) {
    output.push(sortedArr[i][0])
  }
  return output;
};

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
