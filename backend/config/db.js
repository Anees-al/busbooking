import mongoose from 'mongoose';
// connection mongoose to the server

const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log('db connected successfully');
    } catch (error) {
        console.log(error.message)
       process.exit(1)
    }
}

export default connectDb;