
import busModel from "../models/busModel.js"

export const createBus=async(req,res)=>{
    try {
        const newBus=new busModel(req.body);
        await newBus.save()
        return res.status(200).json({message:'successfully created the bus',newBus});

    } catch (error) {
        return res.status.error(400).json({message:error.message});
    }
}



export const getBusByRoutes=async(req,res)=>{
    
    try {
        const { routePath } = req.params;
        const buses = await busModel.find({ 
            routePath: { $regex: new RegExp(routePath, "i") } 
        });
        return res.status(200).json({message:'succefully fetch all buses in the route',buses})
    } catch (error) {
        return res.status(400).json(error.message)
    }
}




export const getBusByOperators=async(req,res)=>{
    try {
        const {busoperator}=req.params;

        const buses=await busModel.find({busoperator:busoperator});
        return res.status(200).json({message:'successfully fetch all bus by operators',buses})
    } catch (error) {
         return res.status(400).json({message:error.message})
    }
}