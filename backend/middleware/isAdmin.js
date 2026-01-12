


const isAdmin=async(req,res)=>{
        if(req.user.role!=='admin'){
            return res.status(400).json({message:'admin only'})
        }
        next();
    
        
    
}

export default isAdmin;