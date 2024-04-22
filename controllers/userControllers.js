import userDB from "../models/userDB.js"
import mongoose from "mongoose"

export const getTodoItemsController = async(req,res) =>{

    try {
       const users = await userDB.find({})
    res.status(200).send({
        message:'Testing Router setup',
        success:true,
        users
    })
        
    } catch (error) {
    res.status(402).send({
        message:'Error in getting user',
        success:false,
        error
})
        
    }
}

//creating todo item
export const createTodoItemCotroller = async(req,res) =>{
    try {
        const todoItem = await new userDB({
            todoItems:req.body.userValue
        }).save() 

        res.status(202).send({
            message:'todoItem created',
            success:true,
            todoItem
            })
    } catch (error) {
        res.status(402).send({
            message:'Error in creating',
            success:false,
            error})
    }
}

//deleting todo item
export const deleteTodoItemCotroller = async(req,res) =>{
    try {
        const deletedItem = await userDB.findByIdAndDelete(req.params.id)
        res.status(202).send({
            message:'deleted successfull',
            success:true,
            deletedItem
            })
    } catch (error) {
        res.status(402).send({
            message:'Error in deleting user',
            success:false,
            error})
    }
}


//update done
export const updateDoneTodoItemCotroller = async (req,res) =>{
    try {
        const updateDone = await userDB.findByIdAndUpdate(req.params.id,{done:req.body.done},{new:true})

res.status(200).json({
    success:true,
    message:'done successfully updated!!',
    updateDone
})

    } catch (error) {
        res.status(402).json({
            success:false,
            message:'Error in updating done!!',
            error
        })
    }
}

//update todo item
    export const updateTodoItemCotroller = async (req,res) =>{
        try {
            const {id}= req.params
            const {todoItems} = req.body
            const updatedTodo = await userDB.findByIdAndUpdate(id,{todoItems:todoItems},{new:true})
    
    res.status(200).json({
        success:true,
        message:'done successfully updated!!',
        updatedTodo
    })
    
        } catch (error) {
            res.status(402).json({
                success:false,
                message:'Error in updating done!!',
                error
            })
        }
    }
