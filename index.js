'use strict';

const fs = require('fs');

var sortIP = function(arg1, arg2) {
    const ip1 = Number(arg1.ip.split(".").map((ip) => (`000${ip}`).slice(-3) ).join(""));
    const ip2 = Number(arg2.ip.split(".").map((ip) => (`000${ip}`).slice(-3) ).join(""));
    return ip1-ip2;
  }
  
var sortTimeStamp = function(arg1, arg2) { 
    let date1, date2;
    date1 = new Date(arg1.timestamp);
    date2 = new Date(arg2.timestamp)
    return (date1.getTime() - date2.getTime())
  }
  
Array.prototype.sortTime = function() {
    var tempArr = [];
    for(var i = 0; i < this.length - 1; i++){
      if(this[i].ip !== this[i+1].ip){
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

var getHashedArr = function(arr) {
    arr = arr.filter((subSet)=>{
        if(subSet[Object.keys(subSet)[0]].length < 10) {
          let currentAmount, currentTimeObj, finalClicks=[];
          subSet[Object.keys(subSet)[0]].forEach((ipObj)=> {
            let ipTimeObj = new Date(ipObj.timestamp);
            if(!currentTimeObj) {
              currentTimeObj = ipTimeObj;
              currentAmount = ipObj.amount;
              finalClicks.push(ipObj);
            }
            else if(currentTimeObj.getHours() === ipTimeObj.getHours()) {
              if(currentAmount < ipObj.amount) {
                currentTimeObj = ipTimeObj;
                currentAmount = ipObj.amount;
                finalClicks.pop();
                finalClicks.push(ipObj);
              }
              else if(currentAmount === ipObj.amount && (currentTimeObj.getTime() > ipTimeObj.getTime())) {
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

fs.readFile("clicks.json", function(err, data) {
    if (err) throw err;
    var input = JSON.parse(data);
    var sortedArr = (input.sort(sortIP)).sortTime();
    var newData = JSON.stringify(getHashedArr(sortedArr));

    fs.writeFileSync("resultset.json", newData);
    console.log("Please Find Result in result.json file");

});

