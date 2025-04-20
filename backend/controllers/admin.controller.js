import Notice from "../models/notice.js";
import PYQ from "../models/pyq.js";
import User from "../models/userModel.js";
import studyMaterial from "../models/studyMaterial.js";

export const uploadStudyMaterial = async (req,res)=>{
    try {
        const data = req.body;
        console.log(data)

        const splitDocumentFormat= data.uploadData.url.split(".");
        const documentFormat = splitDocumentFormat[splitDocumentFormat.length - 1]
        
        const documentSize = (data.uploadData.size / (1024 * 1024)).toFixed(2)

        console.log(documentFormat)
        const newStudyMaterial = new studyMaterial({
            title:data.subjectTitle,
            uploadedBy:data.user.username,
            uploadedById:data.user.id,
            subject:data.subject,
            documentUrl:data.uploadData.url,
            documentSize,
            documentFormat,
        })

        console.log("new",newStudyMaterial)
        await newStudyMaterial.save();

        return res.json({success:true,message:"StudyMaterial Uploaded Successfull"})

    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:"Error while uploading studyMaterial"})
    }
}


// fetch study material
export const fetchStudyMaterial = async (req,res)=>{
    try {
        const data = await studyMaterial.find({}).sort({createdAt:-1});
        return res.json({success:true,data})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:"Something Went Wrong!"})
    }
}

// upload pyq
export const uploadPYQ = async (req,res)=>{
    try {
       const data = req.body;
       console.log(data)

       if(!data.uploadData.url ||
       !data.subjectTitle || 
        !data.year || 
        !data.sem || 
        !data.subjectCode || 
        !data.subject
        ){
            return res.json({success:false,message:"Incomplete Data"})
        }
       const documentSize = (data.uploadData.size / (1024 * 1024)).toFixed(2)

       const newPYQ = new PYQ({
        documentUrl:data.uploadData.url,
        uploadById:data.user.id,
        title:data.subjectTitle,
        year:Number(data.year),
        semester:data.sem,
        subjectCode:data.subjectCode,
        documentSize,
        uploadBY:data.user.username
       })

       await newPYQ.save();

       return res.json({success:true,message:"PYQ Uploaded Successfull"})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:"Something Went Wrong!"})
    }
}

// fetch pyq
export const fetchPYQ = async (req,res)=>{
    try {
        const data = await PYQ.find({}).sort({createdAt:-1});
        return res.json({success:true,data})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:"Something Went Wrong!"})
    }
}


// Post notification
export const postNotice = async (req,res)=>{
    try {
       const data = req.body;
       console.log(data)

       if(!data.title ||
       !data.description || 
        !data.tag 
        
        ){
            return res.json({success:false,message:"Incomplete Data"})
        }

       const newNotice = new Notice({
      title:data.title,
      description:data.description,
      tag:data.tag,
      isPinned:data.isPinned
       })

       await newNotice.save();

       return res.json({success:true,message:"Notice Posted Successfull"})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:"Something Went Wrong!"})
    }
}

// fetch notice
export const fetchNotices = async (req,res)=>{
    try {
        const data = await Notice.find({}).sort({isPinned:-1,createdAt:-1});
        return res.json({success:true,data})
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:"Something Went Wrong!"})
    }
}

// delete Notice
export const deleteNotice = async (req,res)=>{
    const { id } = req.params;
 
   try {
     const deleted = await Notice.findByIdAndDelete(id);
     if (!deleted) return res.json({ error: "Notice not found." });
 
     res.json({success:true, message: "Notice deleted successfully." });
   } catch (err) {
     console.error("Error deleting Notice:", err.message);
     res.status(500).json({ error: "Something went wrong." });
   }
}
// delete studyMaterial
export const deleteStudyMaterial = async (req,res)=>{
    const { id } = req.params;
 
   try {
     const deleted = await studyMaterial.findByIdAndDelete(id);
     if (!deleted) return res.json({ error: "StudyMaterial not found." });
 
     res.json({success:true, message: "StudyMaterial deleted successfully." });
   } catch (err) {
     console.error("Error deleting Notice:", err.message);
     res.status(500).json({ error: "Something went wrong." });
   }
}
// delete pyq
export const deletePyq = async (req,res)=>{
    const { id } = req.params;
 
   try {
     const deleted = await PYQ.findByIdAndDelete(id);
     if (!deleted) return res.json({ error: "PYQ not found." });
 
     res.json({success:true, message: "PYQ deleted successfully." });
   } catch (err) {
     console.error("Error deleting PYQ:", err.message);
     res.status(500).json({ error: "Something went wrong." });
   }
}

// fetch dashboard overview data
export const fetchDashboardData = async (req,res)=>{
    try {
        const totalUser = await User.find({}).countDocuments();
        const noOfStudyMaterial = await studyMaterial.find({}).countDocuments();
        const noOfNotice = await Notice.find({}).countDocuments();

        console.log(totalUser,noOfStudyMaterial,noOfNotice)
     
        res.json({success:true,data:{totalUser,noOfStudyMaterial,noOfNotice}});
      } catch (err) {
        console.error("Error deleting PYQ:", err.message);
        res.status(500).json({ error: "Something went wrong." });
      }
}