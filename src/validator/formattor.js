let trim = function(){
    let text = "    unmesh     "
    console.log("result after trimming is" + text.trim());
}

module.exports.trim = trim

let changetoLowerCase = function(){
    let string = "UNMESH"
    console.log("in LowerCase" + string.toLowerCase());
}

module.exports.changetoLowerCase = changetoLowerCase

let changetoUpperCase = function(){
    let name = "unmesh"
    console.log("in UpperCase" + name.toUpperCase());
}

module.exports.changetoUpperCase = changetoUpperCase