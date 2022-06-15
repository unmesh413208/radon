const { modelName } = require("../models/userModel");
const userModel = require("../models/userModel")
const jwt = require('jsonwebtoken')


const validateUserIdInPathParem= async function(req,res,next){


    let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails){
    return res.send({ status: false, msg: "No such user exists" })};
    next()
}


const tokenVerification= async function(req,res,next){

    let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  //If no token is present in the request header return error
  if (!token) return res.send({ status: false, msg: "token must be present" });

  
  let decodedToken =  jwt.verify(token, "functionup-radon");
  if (!decodedToken){
    return res.send({ status: false, msg: "token is invalid" }) };


    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId
  
    //userId comparision to check if the logged-in user is requesting for their own data
    if (userToBeModified != userLoggedIn) return res.send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })   

next()
}
                                                  
module.exports.tokenVerification = tokenVerification
module.exports.validateUserIdInPathParem = validateUserIdInPathParem