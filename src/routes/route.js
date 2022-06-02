const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')
const lodash = require('lodash')

const router = express.Router();
// const app = express.application();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api hahaha!')
});



router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:Candidatename', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})


// app.get("/sol1", function (req, res) {
//     //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
//     let arr= [1,2,3,5,6,7]
//     let n = (n*n+1)/2
//     let sum = 0

//     let missingNumber = n - sum
    
//     for(let i=0;i<arr.length;i++){
//         sum = sum + i
//     }
//     console.log("missing " + missingNumber );

//     ///LOGIC WILL GO HERE 
//     res.send(  { data: missingNumber  }  );
// });

module.exports = router;
// module.exports = app;
// adding this comment for no reason