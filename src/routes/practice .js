
const lodash = require('lodash')

// let printDate = function (){
//     let today = new Date()
//     let date = today.getDate()+'-'+(today.getMonth() +1)+'-'+today.getFullYear()
//     // Added 1 to month because months start from 0
//     console.log('Current date is: ', date)
// }


// let printMonth = function(){
//     let month = new Date()
//     let date = month.getMonth() + 1
//     console.log(date);
// }

// function trim(){
//     let name = "    unmesh     "
//     console.log("trimmed" + "   " + name.trim());
// }

// function toupperCase(){
//     let string = "unmesh"
//     console.log("to lower case is" + string.toUpperCase());
// }

// function chunk(){
//     let arr = [1,2,3,4,5,6,7,8,9,10,11,12]
//     let arr2 = lodash.chunk(arr,3)
//     console.log(arr2);
// }

function tail ( ){
    let oddNumbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    let lastNumbers = lodash.tail(oddNumbers)
    console.log('Last 9 odd numbers: ',lastNumbers)
}




module.exports.tail     = tail

