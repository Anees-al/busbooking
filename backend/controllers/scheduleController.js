import sheduleModel from "../models/scheduleModel.js";
import busModel from '../models/busModel.js'

export const getOrCreateSchedule = async (req, res) => {
    try {
        const { busId, travelDate } = req.body;
        
        if(!busId||!travelDate){
            return res.status(400).json({message:'please fill the fileds'})
        }
        let schedule = await sheduleModel.findOne({ busId, date: travelDate });

        // 2. If it exists, send it immediately!
        if (schedule) {
            return res.status(200).json({ 
                message: 'Schedule retrieved', 
                schedule 
            });
        }

        // 3. If NOT, then create it
        const busDetails = await busModel.findById(busId);
        if (!busDetails) {
            return res.status(404).json({ message: 'Bus details not found for this ID' });
        }
        const seatsArray = [];
        for (let i = 1; i <= busDetails.totalseats; i++) {
            seatsArray.push({ seatNumber: i, isBooked: false });
        }

        schedule = new sheduleModel({
            busId,
            date: travelDate,
            seats: seatsArray
        });

        await schedule.save();
        return res.status(201).json({ message: 'Schedule created', schedule });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}