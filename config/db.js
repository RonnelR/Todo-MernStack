import mongoose from "mongoose";

export const databaseConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`database connected successfull `.bgBlue.white)
    } catch (error) {
        console.log('error in database connection'.bgRed.white)
        }
}
