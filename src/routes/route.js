const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')
const lodash = require('lodash')

const router = express.Router();
// const app = express.application();



// MODULE 4 AND API ASSIGNMENT MERGED TOGETHER.







//problem 1

router.get('/movies', function (req, res) {
    let movies = ['forrest gump', 'kumbalangi nights', 'scarface', 'taxi driver']

    console.log(movies);
    res.send('done')
})








//problem 2 and problem 3

router.get('/getMovies/:indexNumber', function (req, res) {
    let movies = ['forrest gump', 'kumbalangi nights', 'scarface', 'taxi driver', 'massan']
    let movieIndex = req.params.indexNumber
    let finalMovie = ""
    if (movieIndex < movies.length) {
        finalMovie = movies[movieIndex]
    } else {
        finalMovie = ("does not exist")
    }
    console.log(movies.length);
    // console.log('the request object is'+ JSON.stringify(req.params));
    // console.log('movie name is '+ req.params.finalMovie);
    res.send(finalMovie)





})


//problem 4


router.get('/films', function (req, res) {
    let films = [{
        'id': 1,
        'name': 'The Shining'
    }, {
        'id': 2,
        'name': 'Incendies'
    }, {
        'id': 3,
        'name': 'Rang de Basanti'
    }, {
        'id': 4,
        'name': 'Finding Nemo'
    }]


    res.send(films)

})

//problem 5

router.get('/film/:filmId', function (req, res) {
    let films = [{
        'id': 1,
        'name': 'The Shining'
    }, {
        'id': 2,
        'name': 'Incendies'
    }, {
        'id': 3,
        'name': 'Rang de Basanti'
    }, {
        'id': 4,
        'name': 'Finding Nemo'
    }]

   

    let movieIndex = req.params.indexNumber;
    let finalMovie = ""
    if (movieIndex < films.length) {
        finalMovie = films[movieIndex]
    } else {
        console.log('does not exist' + finalMovie);
    }

    console.log(films.length);

    res.send(finalMovie)






})









// 2 june assignment- module 4

router.get('/hello', function (req, res) {
    let a = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sept", "oct", "nov", "dec"]
    const b = lodash.chunk(a, 3)
    console.log(b);

    res.send('Hello there!')
});

router.get('/tail', function (req, res) {
    // let a = [1,3,5,7,9,11,13,15,17,19]

    const b = lodash.tail([1, 3, 5, 7, 9, 11, 13, 15, 17, 19])
    console.log(b);

    res.send('here is the tail')


})

router.get('/union', function (req, res) {

    let a = lodash.union([1], [1, 2], [1, 2, 3], [1, 2, 3, 4], [1, 2, 3, 4, 5])
    console.log(a);

    res.send('here is the union')


})

router.get('/fromPairs', function (req, res) {
    let a = lodash.fromPairs([['horror', 'The Shining'], ['drama', 'Titanic'], ['thriller', 'Shutter Island'], ['fantasy', 'Pans Labyrinth']])

    console.log(a);

    res.send('this is from Pairs')
})




module.exports = router;
// module.exports = app;
// adding this comment for no reason







