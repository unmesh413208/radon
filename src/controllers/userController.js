const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = req.body;
  let savedData = await userModel.create(data);
  // console.log(abcd.newAtribute);
  res.send({ msg: savedData });
};


const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  console.log(user)
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret
  // The same secret will be used to decode tokens
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "thorium",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  //If no token is present in the request header return error
  if (!token) return res.send({ status: false, msg: "token must be present" });

  console.log(token);

  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself
  let decodedToken = jwt.verify(token, "functionup-radon");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {
  // Do the same steps here:
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  if (!token) return res.send({ status: false, msg: "token must be present" });

  let decodedToken = jwt.verify(token, "functionup-thorium");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });


  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //console.log(user)
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.send("No such user exists");
  }

  //let userData = req.body;
  //console.log(userData);  
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId, isDeleted: false },
    { $set: req.body },
    { new: true }
  );
  //const updatedUser= await userModel.findOneAndUpdate({_id:userId,isDeleted:true},{$set: req.body},{new:true})
  res.send({ status: true, data: updatedUser });
};


const deleteUser = async function (req,res) {
  const userId = req.params.userId;
  const deletedUser = await userModel.findOneAndUpdate(
    {_id:userId},
    {$set: {isDeleted:true}}
    )


  res.send({status:true,msg:"user deleted"})
}

module.exports.deleteUser = deleteUser
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
