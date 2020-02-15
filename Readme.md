# clicksjs

This is a take home assignment solution with given problem statement :

Requirements  Given an array of clicks, return the subset of clicks where:  
 
1. For each IP within each one hour period, only the most expensive click is placed into the result set. 
2. If more than one click from the same IP ties for the most expensive click in a one hour period, only place the earliest click into the result set.
3. If there are more than 10 clicks for an IP in the overall array of clicks, do not include any of those clicks in the result set.  
 
The result set should be stored in an array of hashes. Each hash should represent a click. The expected result set should be a subset of the original array. 

SOLUTION :-

After extracting the project folder go to the root and following commands are to be followed :
1. To install all the dependencies - npm install
2. To run the project - npm run solution
3. To run test cases - npm run test

Dependencies used : 
1. jest - A testing library, Its used for unit testing because it works out of box with minimal configuration and setup also it runs tests in parallel.