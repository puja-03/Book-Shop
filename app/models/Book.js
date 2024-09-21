import mongoose, { model } from "mongoose"
import Category from "./Category"

const BookSchema = new mongoose.Schema({
  title:{type:String,required:true},
  author:{type:String,required:true},
  description:{type:String,required:true},
  category:{type:mongoose.Schema.Types.ObjectId, required:true, ref:Category},
  price:{type:Number,required:true},
  dprice:{type:Number,required:true},
  cover_image:{type:String,required:true},
  status:{type:Boolean,default:true}
},{timestamps:true})
//delete mongoose.models.Book
export default mongoose.models.Book|| mongoose.model("Book",BookSchema)