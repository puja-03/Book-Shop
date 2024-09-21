import mongoose from "mongoose";

const DbConnect = async() =>{
    try{
        return await mongoose.connect("mongodb://localhost:27017/bookstore");
    }
    catch(e){
        throw new Error("Data connection faild try again");
    }
}
export default DbConnect;