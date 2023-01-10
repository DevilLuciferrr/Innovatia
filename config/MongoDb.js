import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const connectDB =  async() =>{
try{
    const conn = await mongoose.connect(process.env.MONGO_URL,{
        useUnifiedTopology:true,
        useNewUrlParser: true,
    });
    console.log("Mongo Connected");
}
catch(error){
    console.log(`Error: ${error.message}`)
    process.exit(1)
}
}

export default connectDB;