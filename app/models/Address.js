import mongoose from "mongoose"

const AddressSchema = new mongoose.Schema({
 
  name:{
    type:String ,
    required:true,
    unique:true
   },
  contact:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true
},
area:{
    type:String,
    required:true
},
state:{
    type:String,
    required:true 
},
landmark:{
    type:String,
    required:true
},
user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User",
  required:true
},
pincode:{
    type:String,
    required:true
},
type:{
    type:String,
    required:true,
    default:"home"
}
})
//delete mongoose.models.Address
export default mongoose.models.Address || mongoose.model("Address", AddressSchema)
