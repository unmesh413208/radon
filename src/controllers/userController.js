const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//--------------------------------CREATE USER--------------------------------------------


const createUser = async function (req, res) {

  try {

    let data = req.body;
 
    if (Object.keys(data).length != 0) {

      let savedData = await userModel.create(data);
      res.status(201).send({ status: true, msg: "Data Created and saved into DB", savedData });
    }
    else {
      res.status(400).send({ msg: "BAD REQUEST" })
    }
  }
  catch (baderror) {
    res.status(500).send({ msg: "Check for your error", error: baderror.message })
  }

};



//-------------------------------------LOGIN USER -----------------------------------------------


const loginUser = async function (req, res) {

  try {

    let userName = req.body.emailId;
    let password = req.body.password;
    let user = await userModel.findOne({ emailId: userName, password: password });


    if (!user)
      return res.status(401).send({                     //Authentication Error
        status: false,
        msg: "username or the password is not corerct",
      });

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "thorium",
        organisation: "FunctionUp",
      },
      "functionup-radon"
    );
    res.setHeader("x-auth-token", token);
    res.status(201).send({ status: true, data: token });

  }

  catch (baderror) {
    res.status(500).send({ msg: "Check for your error", error: baderror.message })
  }
};



//----------------------------------GET USER--------------------------------------------


const getUserData = async function (req, res) {

  try{
//>>>>>>>>>>Token Check
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  //If no token is present in the request header return error
  if (!token) return res.status(401).send({ status: false, msg: "token must be present" }); 
  //Authentication Missing

  console.log(token);
//>>>>>>>>>>>>>Validation
  // If a token is present then decode the token with verify function
  // verify takes two inputs:
  // Input 1 is the token to be decoded
  // Input 2 is the same secret with which the token was generated
  // Check the value of the decoded token yourself
  let decodedToken = jwt.verify(token, "functionup-radon");
  if (!decodedToken)
    return res.status(500).send({ status: false, msg: "token is invalid" }); //Authentication missing

//>>>>>>>>>>>>>>>>Authorisation
  let userToBeModified = req.params.userId
  //userId for the logged-in user
  let userLoggedIn = decodedToken.userId

  //userId comparision to check if the logged-in user is requesting for their own data
  if (userToBeModified != userLoggedIn) return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })   //not authenticated or forbidden

//>>>>>>>>>>>>>>>>

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(401).send({ status: false, msg: "No such user exists" });

  res.status(201).send({ status: true, data: userDetails });
  }
  catch( baderror ) {
    res.status(500).send({ msg: "Check for your error", error: baderror.message })

  }
};





//--------------------------------------UPDATE THE USER---------------------------------

const updateUser = async function (req, res) {

  try{

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>Token Check
  // Do the same steps here:
  // Check if the token is present
  // Check if the token present is a valid token
  // Return a different error message in both these cases
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

  if (!token) return res.status(401).send({ status: false, msg: "token must be present" });
  //authentication missing



//>>>>>>>>>>>>>>>>>Validation
  let decodedToken = jwt.verify(token, "functionup-radon");
  if (!decodedToken)
    return res.status(500).send({ status: false, msg: "token is invalid" });
//server error


//>>>>>>>>>>>>>>>>>>>Authorisation    

let userToBeModified = req.params.userId
  //userId for the logged-in user
  let userLoggedIn = decodedToken.userId

  //userId comparision to check if the logged-in user is requesting for their own data
  if (userToBeModified != userLoggedIn) return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })



//>>>>>>>>>>>>>>>>>>>>>>>>

  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  //console.log(user)
  //Return an error if no user with the given id exists in the db
  if (!user) {
    return res.status(401).send("No such user exists");
  }


  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: req.body },
    { new: true }
  );
  
  res.status(201).send({ status: true, data: updatedUser });
  }
  catch(baderror){
    res.status(500).send({ msg: "Check for your error", error: baderror.message })
  }
};

//--------------------------------------DELETE USER

const deleteUser = async function (req, res) {

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>Authorisation

  let userToBeModified = req.params.userId
  //userId for the logged-in user
  let userLoggedIn = decodedToken.userId

  //userId comparision to check if the logged-in user is requesting for their own data
  if (userToBeModified != userLoggedIn) return res.status(403).send({ status: false, msg: 'User logged is not allowed to modify the requested users data' })

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const userId = req.params.userId;
  const deletedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { $set: { isDeleted: true } }
  )


  res.status(201).send({ status: true, msg: "user deleted" })
}

module.exports.deleteUser = deleteUser
module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;