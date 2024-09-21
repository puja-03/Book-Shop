import mongoose from "mongoose"

const OrderItemSchema = new mongoose.Schema({
  bookId:{
    type :mongoose.Schema.Types.ObjectId,
    ref :"Book",
    required:true
  },
  quantity:{
    type:Number,
    required:true,
    default:1
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
  },
  orderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Order",
    required:true

  }
},{timestamps:true})
//delete mongoose.models.OrderItem

export default mongoose.models.OrderItem || mongoose.model("OrderItem",OrderItemSchema)