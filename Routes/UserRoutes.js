import express from 'express';
import asyncHandler from 'express-async-handler';
import protect from '../Middleware/AuthMiddleware.js';
import User from '../Models/UserModel.js';
import generateToken from '../utils/generateToken.js';


const userRouter = express.Router();

// GET ALL userS
userRouter.post(
    "/login",
    asyncHandler(async (req,res)=>{
    const { email, password } = req.body
    const user = await User.findOne({ email })
        console.log(user)
  if (user) {
    if(await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createAt:user.createdAt
      })
    } else {
      res.status(401)
      throw new Error('Invalid password')
    }}else {
        res.status(401)
        throw new Error('Invalid Email')
      }
    })
)

userRouter.get("/profile",protect,asyncHandler(async(req,res)=>
{
  const user = await User.findById(req.user._id)
  // res.send("User Profile");
  if(user){
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      createAt:user.createdAt
    })
  }else{
    res.status(404)
    throw new Error('User Not Found')
  }
}))

userRouter.post("/",asyncHandler(async(req,res)=>
{
  const {name, email, password } = req.body;
  const userExist = await User.findOne({ email })
  if(userExist){
    res.status(400);
    throw new Error("User already exists, try Logging In");
  }
  const user = await User.create({
    name,email,password
  });
  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })}
    else{
      res.status(400)
      throw new Error("User could not be created")
    }
}))

export default userRouter;