import mongoose from 'mongoose';

const busSchema=new mongoose.Schema({
    busname:{type:String,required:true,trim:true},
    buscode:{type:String,required:true},
    bustype:{type:String,enum:['sleeper','semi-sleeper','seater']},
    isAC:{type:Boolean,default:false},
    totalseats:{type:Number,required:true,default:40},
    bookseats:{type:[String],default:[]},
    busoperator:{type:String,required:true},
    busownership:{type:String,enum:['government','private'],default:'private'},
    amenities:{type:[String],default:[]},
    stops:[
        {
          stationname:{type:String,required:true},
          arrivaltime:{type:String},
          depaturetime:{type:String},
          sequence:{type:Number},
          pricefromorgin:{type:Number,required:true}
        }
       
    ],
    journeyDate: { type: Date, required: true },
    daysAvailable: { 
    type: [String], 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] // Daily
},
 origin:{type:String,required:true},
    destination:{type:String,required:true},
  routePath: { type: String }

   

},{timestamps:true})


busSchema.pre('save', function(next) {
    if (this.origin && this.destination) {
        this.routePath = `${this.origin} to ${this.destination}`;
    }
    next();
});

const busModel=new mongoose.model('bus',busSchema);
export default busModel;