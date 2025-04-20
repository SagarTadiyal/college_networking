export const checkIsAdmin = (req,res,next)=>{
    try {
        const {user} = req.body;

        if(!user){
            return res.json({success:false,message:"User Invalid"})
        }

        if(!user.isAdmin){
            return res.json({success:false,message:"You are not Authorized"})
        }

        next();
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:"Something Went Wrong!"})
    }
}