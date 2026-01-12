import jwt from 'jsonwebtoken'


const authentication=(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.status(400).json({message:'not authenticated login first'})
    }


    try {
     const decodedToken=   jwt.verify(token,process.env.JWT_SECRET);
     req.user=decodedToken;



     next();
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}



export default authentication