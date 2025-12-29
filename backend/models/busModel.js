import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
    // Basic Info
    busname: { type: String, required: true, trim: true },
    buscode: { type: String, required: true, unique: true },
    bustype: { type: String, enum: ['sleeper', 'semi-sleeper', 'seater'] },
    isAC: { type: Boolean, default: false },
    totalseats: { type: Number, required: true, default: 40 },
    
    // Operator Info
    busoperator: { type: String, required: true },
    busownership: { type: String, enum: ['government', 'private'], default: 'private' },
    amenities: { type: [String], default: [] },

    // Route Logic
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    routePath: { type: String },
    
    // Schedule Logic (Which days does this route run?)
    daysAvailable: { 
        type: [String], 
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },

    // Stops & Pricing
    stops: [
        {
            stationname: { type: String, required: true },
            arrivaltime: { type: String },
            depaturetime: { type: String },
            sequence: { type: Number },
            pricefromorgin: { type: Number, required: true }
        }
    ]
}, { timestamps: true });

// Auto-generate routePath for searching
busSchema.pre('save', function(next) {
    if (this.origin && this.destination) {
        this.routePath = `${this.origin} to ${this.destination}`;
    }
    next();
});

const busModel = mongoose.models.bus || mongoose.model('bus', busSchema);
export default busModel;