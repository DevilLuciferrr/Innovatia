import express from  "express";
import dotenv from "dotenv";
import connectDB from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import userRouter from "./Routes/UserRoutes.js";
import cors from "cors";
const path = require('path')

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors())
// API
app.use("/api/import",ImportData);
app.use("/api/products",productRoute);
app.use("/api/users",userRouter);
app.get("/",(req,res)=>{
    res.send("API Running");
});

app.use(express.static(path.join(__dirname,'./Frontend/build')))
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'./Frontend/build/index.html'));

})

const PORT = process.env.PORT||1000 ;

app.listen(5000,console.log(`Server Running port ${PORT}`));