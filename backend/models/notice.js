import mongoose from "mongoose";
 
 const noticeSchema = new mongoose.Schema({
   title: { type: String, required: true },
   description: { type: String, required: true },
   isPinned: { type: Boolean, default: false },
   tag: { type: String, default: "General" },
 },{timestamps:true});
 
 const Notice = mongoose.model("Notice", noticeSchema);
 export default Notice;