
import busModel from "../models/busModel.js"

export const createBus=async(req,res)=>{
    try {
        const newBus=new busModel(req.body);
        await newBus.save()
        return res.status(200).json({message:'successfully created the bus',newBus});

    } catch (error) {
        return res.status(400).json({message:error.message});
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



// Import your Model (The blueprint of your database collection)

export const searchBuses = async (req, res) => {
    try {
        const { from, destination, date, category } = req.body;

        // 1. Validation
        if (!from || !destination || !date) {
            return res.status(400).json({ 
                success: false, 
                message: 'Please provide From, Destination, and Date' 
            });
        }

        // 2. Identify the Day of the Week from the selected date
        // Example: If user picks 2025-12-28, this becomes "Sunday"
        const dayName = new Date(date).toLocaleDateString("en-US", { weekday: 'long' });

        // 3. Build the Query
        const query = {
            origin: { $regex: new RegExp(from, "i") },
            $or: [
                { destination: { $regex: new RegExp(destination, "i") } },
                { "stops.stationname": { $regex: new RegExp(destination, "i") } }
            ],
            // Check if the bus operates on this specific day of the week
            daysAvailable: dayName 
        };

        // Filter by bus type (sleeper, seater, etc.) if category is selected
        if (category && category !== "All") {
            query.bustype = category;
        }

        // 4. Database Query
        const foundBuses = await busModel.find(query);

        // 5. Response
        return res.status(200).json({
            success: true,
            day: dayName, // Informative for the frontend
            results: foundBuses.length,
            data: foundBuses
        });

    } catch (error) {
        console.error("Search Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
};



export const getBusById=async(req,res)=>{
    try {
        const {id}=req.params
        const buses=await busModel.findById(id);
        
        return res.status(200).json({message:'succefully fetch',buses})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}