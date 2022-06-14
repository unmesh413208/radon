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

    let token = req.headers["x-auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  //If no token is present in the request header return error
  if (!token) return res.send({ status: false, msg: "token must be present" });

  
  let decodedToken =  jwt.verify(token, "functionup-thorium");
  if (!decodedToken){
    return res.send({ status: false, msg: "token is invalid" }) };

next()
}

module.exports.tokenVerification = tokenVerification
module.exports.validateUserIdInPathParem = validateUserIdInPathParem