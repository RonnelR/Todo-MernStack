import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import {databaseConnection} from './config/db.js';
import router from './routers/userRouters.js';
import morgan from 'morgan';
import cors from 'cors'

//dotenv and colors config
dotenv.config();
colors.enable();


//express config
const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//Routes setup
app.use('/api/user',router)

const PORT = process.env.REST_API_PORT;

//mongodb connection
databaseConnection();

//testing - creating user
// const newUser = async() => await  userDB({
//     todoItems:"Just Created!"
// }).save()

app.get('/', function(req,res){
    res.send("HELLO WORLD!!")
})

//port 
app.listen(PORT,function(){
    console.log(`server running in ${PORT}`.yellow.bgMagenta)

})