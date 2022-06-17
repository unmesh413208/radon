const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const WeatherController = require("../controllers/weatherController")
const memeController = require("../controllers/memecontroller")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

//-------------------Cowin Api

router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

router.get("/cowin/findbydistrictID",CowinController.findbyDistrictId)


//----------Weather Api


router.get("/getweather",WeatherController.getWeather)
router.get("/gettemponly",WeatherController.gettemponly)
router.get("/tempsort",WeatherController.tempsort)


//-------------Meme Api



router.get("/getMemes",memeController.getMeme)
router.post("/getCustomMeme",memeController.getCustomMeme)











// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;