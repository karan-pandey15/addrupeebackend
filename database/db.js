import mongoose from "mongoose";
// let MONGO_URI = "mongodb+srv://pandeykaran1515:JXZKpKd0m92fIR33@cluster0.6wigqio.mongodb.net/?retryWrites=true&w=majority";
import { config } from "dotenv";
config();
let MONGO_URI = process.env.MONGO_URI;



const db = () => {
  mongoose.connect(MONGO_URI).then(()=>{
    console.log("connection successFull...")
}).catch((err)=>{
    console.log(err)
})
};

export default db;
