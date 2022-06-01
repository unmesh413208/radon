let printDate = function(){
    let currentDate = new Date()
    console.log("the current date is" + currentDate);
}

module.exports.printDate = printDate


let printMonth = function(){
    let currentMonth = new Date()
    console.log("the current month is" + currentMonth);
}

module.exports.printMonth = printMonth

let getBatchInfo = function(){
    console.log("Radon - W3/D3 - the topic for today is Node Js Module System");
}

module.exports.getBatchInfo = getBatchInfo