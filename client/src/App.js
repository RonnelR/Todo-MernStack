import './App.css';
import React , {useState , useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare ,faSquareCheck ,faSquare} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import toast from 'react-hot-toast'
import {Modal} from 'antd'


function  App () {

const [todoitem,setTodoitem] = useState([])
const [userValue,setUserValue] = useState([])
const [isModalOpen,setIsModalOpen] = useState(false)
const [updatedItems,setUpdatedItems] = useState('')
const [updateId,setUpdateId] = useState()




const getTodoList = async () =>{
  try {
   const res= await axios.get('/api/user/get-todo');
   if(res){
    setTodoitem(res?.data?.users)
   }
  
  } catch (error) {
    toast.error("Something went wrong!")
  }
}

useEffect(()=>{
  getTodoList();

},[])


//creating todo item
const handleTodo = async (e) =>{
   e.preventDefault()
  try {
    const {data} = await axios.post('/api/user/create-todoItem',{userValue})
    if(data){
      toast.success('item created!')
      setUserValue('')
      getTodoList()
    }
  } catch (error) {
    toast.error("something went wrong!")
  }
}


//handle delete todo item
const handleDelete = async(id) =>{
try {
  const {data} = await axios.delete(`/api/user/delete-todoItem/${id}`)
  if(data){
    toast.success('item deleted')
    console.log(id)
   getTodoList()
  }
} catch (error) {
  toast.error('something went wrong')
}
}


//update todo item
const handleUpdate = async() =>{
  try {
    const {data} = await axios.put(`/api/user/update-todoItem/${updateId}`,{todoItems:updatedItems})
    
    if(data){
      toast.success('item updated')
     getTodoList()
     setIsModalOpen(false)
    }
  } catch (error) {
    toast.error('something went wrong')
  }
  }

  //handle done check
const handleDone = async (id,check) =>{
  try {
    const {data} = await axios.put(`/api/user/done-todoItem/${id}`,{done:check})
    getTodoList()

  } catch (error) {
    toast.error('Error in done')
  }
}

  return (

    <div className=' p-5 text-center'>
    <div className='todoBody'>
     <h1 className='header'>Todo List</h1>
     <form className='inputForm' onSubmit={(e)=>{handleTodo(e)}}>
      <input  type='text' placeholder={'Add new todo...'} value={userValue} onChange={(e)=>{setUserValue(e.target.value)}} />
      <button className='btn btn-success m-3' type='submit'>submit</button>
    </form>


      {/* todo items */}
      {todoitem.length < 1 ?
        <div className='m-5'><h4 >No todos, create one...</h4></div> :
        <>
        {todoitem.map((i)=>(
        <div className='d-flex flex-row justify-content-between todoItems m-3' key={i._id}>
      
          {i?.done ? 
          <>
          <button style={{border:'none',background:"none"}} onClick={()=>{
            handleDone(i?._id,false)
          }}><FontAwesomeIcon icon={faSquareCheck}
         style={{color: "#16bb3f",}} size='2xl'  /></button>
         <h4 className='lineThrough'>{i.todoItems}</h4>
          </> :
           <>
           <button style={{border:"none", backgroundColor:'transparent'}} onClick={()=>{
            
            handleDone(i?._id,true )
          }}><FontAwesomeIcon icon={faSquare} style={{color:'green'}} size='2xl' /></button>
          <h4>{i.todoItems}</h4>
          </>}

          <div >
        <button className='btn btn-warning m-1' onClick={()=>{
        setUpdatedItems(i?.todoItems)
        setUpdateId(i?._id)
        setIsModalOpen(true)
       
        }}> <FontAwesomeIcon icon={faPenToSquare} /></button>

        <button className='btn btn-danger ' onClick={()=>handleDelete(i._id)}> <FontAwesomeIcon icon={faTrash} /></button>
        </div>
        </div>
      
        ))}
        </>
      }
      </div>
      <>     
      <Modal 
      title="Update Item" 
      footer={null}
      open={isModalOpen}  
      onCancel={() => setIsModalOpen(false)} 
      
      >
        <input type='text' value={updatedItems} onChange={(e)=>setUpdatedItems(e.target.value)}></input>
        <button className='btn btn-success m-2' onClick={handleUpdate}>Add</button>
      </Modal>
      </>

 
    </div>

  

  );
}

export default App;
