import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema({
    uploadedById:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    uploadedBy: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        enum:["Data Structures & Algorithms","DBMS","Computer Networks","Database Management Systems","Operating Systems","Theory of Computation"],
        required: true,
    },
    documentUrl: {
        type: String,
        required: true,
    },
    documentSize:{
        type:String,
        required:true
    },
    documentFormat:{
        type:String,
        reqired:true
    },
    downloads:{
        type:Number,
        default:100
    }
},{timestamps:true});

const studyMaterial = mongoose.model("studyMaterial", studyMaterialSchema);
export default studyMaterial;
