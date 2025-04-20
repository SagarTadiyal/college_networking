import mongoose from 'mongoose'

const pyqSchema = new mongoose.Schema({
    uploadedBy:{
        type:String,
    },
    uploadedById:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    subjectCode:{
        type:String,
        required:true
    },
    documentSize:{
        type:String,
        required:true
    },
    documentUrl:{
        type:String,
        requierd:true
    },
    downloads:{
        type:Number,
        default:100
    }
},{timestamps:true})

const PYQ = mongoose.model("PYQ",pyqSchema)

export default PYQ;