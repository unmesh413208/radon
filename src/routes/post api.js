const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')
const lodash = require('lodash')

const router = express.Router();
 
// let players =
//    [
//        {
//            "name": "manish",
//            "dob": "1/1/1995",
//            "gender": "male",
//            "city": "jalandhar",
//            "sports": [
//                "swimming"
//            ]
//        },
//        {
//            "name": "gopal",
//            "dob": "1/09/1995",
//            "gender": "male",
//            "city": "delhi",
//            "sports": [
//                "soccer"
//            ],
//        },
//        {
//            "name": "lokesh",
//            "dob": "1/1/1990",
//            "gender": "male",
//            "city": "mumbai",
//            "sports": [
//                "soccer"
//            ],
//        },
//    ]
 
//    router.post('/players', function (req, res) {
//      let a = req.body.element

//      players.push(a)


//        res.send(  { data: players , status: true }  )
//    })
  
module.exports = router;


let players = []

router.post('/players',function (req,res){
    let newPlayer = req.body
    let newPlayersName = newPlayer.name
    let isNameRepeated = false

    for(let i = 0; i< players.length ; i++){
        if(players[i].name == newPlayersName){
            isNameRepeated = true
            break
        }
    }
    if(isNameRepeated){
        res.send("this player was already added")
    }else{
        players.push(newPlayer)
        res.send(players)
    }
})
