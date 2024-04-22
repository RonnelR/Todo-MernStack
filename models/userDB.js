import mongoose from 'mongoose'

//schema
const userSchema = new mongoose.Schema({
    todoItems:{
        type:String,
        required:true
    },
    done:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

//model
export default mongoose.model('users',userSchema)