let axios = require("axios")


const getWeather = async function (req, res) {



    try {
        let city = req.query.q
        let appid = req.query.appid
        console.log(`query params are: ${city} ${appid}`)
        var options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
        }
        let result = await axios(options)
        res.status(200).send({ msg: result.data })


    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

}

const gettemponly = async function (req, res) {
    try {
        let city = req.query.q;
        let appid = req.query.appid
        let options = {

            method: 'get',
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
        }
        let result = await axios(options)
        let data = result.data
        res.status(200).send({ msg: data.main.temp })
    }
    catch (err) {
        res.status(500).send({ ERROR: err.message })
    }
}


const tempsort = async function (req, res) {
    try {
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let tempcityarray = []

        for (let i = 0; i < cities.length; i++) {

            let first = { city: cities[i] }   //{city : "Kolkata"}
            let result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=4c99ee5ad5f5da8285e186fd4cbf7d4c`)
            first.temp = result.data.main.temp   //  {city : "Kolkata" , temp : 301}
            tempcityarray.push(first)
        }

        let sorttempcityarray = tempcityarray.sort(function (a, b) { return a.temp - b.temp })  //sorting
        res.status(200).send({ msg: sorttempcityarray })
    } catch (err) {
        res.status(500).send({ ERROR: err.message })
    }
}

module.exports.getWeather = getWeather
module.exports.gettemponly = gettemponly
module.exports.tempsort = tempsort

