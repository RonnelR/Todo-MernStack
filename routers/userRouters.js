import express from 'express'
import { createTodoItemCotroller, deleteTodoItemCotroller, getTodoItemsController, updateDoneTodoItemCotroller, updateTodoItemCotroller } from '../controllers/userControllers.js';

const router = express.Router();

//get all-todo items
router.get('/get-todo',getTodoItemsController)

//post new todo Items
router.post('/create-todoItem', createTodoItemCotroller)

//update done
router.put('/done-todoItem/:id', updateDoneTodoItemCotroller)

//update todoitem
router.put('/update-todoItem/:id', updateTodoItemCotroller)

//delete todo item
router.delete('/delete-todoItem/:id', deleteTodoItemCotroller)


export default router