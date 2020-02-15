'use strict';

const fs = require('fs');
const { filePathName, outputPathName } = require('./constants');

/* function to sort an array in ascending order of IP
return boolean*/

var sortIP = function (arg1, arg2) {
  const ip1 = Number(arg1.ip.split(".").map((ip) => (`000${ip}`).slice(-3)).join(""));
  const ip2 = Number(arg2.ip.split(".").map((ip) => (`000${ip}`).slice(-3)).join(""));
  return ip1 - ip2;
}

/* function to sort an array in ascending order of Timestamp
returns boolean*/

var sortTimeStamp = function (arg1, arg2) {
  let date1, date2;
  date1 = new Date(arg1.timestamp);
  date2 = new Date(arg2.timestamp)
  return (date1.getTime() - date2.getTime())
}

/* function to sort an sorted array by IP in ascending order of Timestamp
returns boolean*/

Array.prototype.sortTime = function () {
  var tempArr = [];
  for (var i = 0; i < this.length - 1; i++) {
    if (this[i].ip !== this[i + 1].ip) {
      let ob = {};
      ob[this[i].ip] = this.splice(0, i + 1).sort(sortTimeStamp);
      tempArr.push(ob);
      i = -1;
    }
  }
  var lastVal = {};
  lastVal[this[0].ip] = this.sort(sortTimeStamp)
  tempArr.push(lastVal)
  return tempArr;
}

/* function to get most expensive clicks within each hour period excludind clicks for IP whoose occurence is more than 10 times in the over all array 
returns an array of objects containing clicks grouped by IP addresses with most expensive clicks in each hour corresponding to that IP */

var getHashedArr = function (arr) {
  arr = arr.filter((subSet) => {
    if (subSet[Object.keys(subSet)[0]].length < 10) {
      let currentAmount, currentTimeObj, finalClicks = [];
      subSet[Object.keys(subSet)[0]].forEach((ipObj) => {
        let ipTimeObj = new Date(ipObj.timestamp);
        if (!currentTimeObj) {
          currentTimeObj = ipTimeObj;
          currentAmount = ipObj.amount;
          finalClicks.push(ipObj);
        }
        else if (currentTimeObj.getHours() === ipTimeObj.getHours()) {
          if (currentAmount < ipObj.amount) {
            currentTimeObj = ipTimeObj;
            currentAmount = ipObj.amount;
            finalClicks.pop();
            finalClicks.push(ipObj);
          }
          else if (currentAmount === ipObj.amount && (currentTimeObj.getTime() > ipTimeObj.getTime())) {
            currentTimeObj = ipTimeObj;
            finalClicks.pop();
            finalClicks.push(ipObj);
          }
        }
        else {
          currentTimeObj = ipTimeObj;
          currentAmount = ipObj.amount;
          finalClicks.push(ipObj);
        }
      });
      subSet[Object.keys(subSet)[0]] = finalClicks;
      return finalClicks
    }
  });
  return arr;
}


const results = function results(file, output) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) reject(err);
      var input = JSON.parse(data);
      var sortedArr = (input.sort(sortIP)).sortTime();
      var newData = JSON.stringify(getHashedArr(sortedArr));
      fs.writeFileSync(output, newData);
      resolve(newData);
    });
  });
}

results(filePathName, outputPathName).then(() => console.log("Please Find Result in resultset.json file"));

module.exports = results;

