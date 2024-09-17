import React, { useState } from 'react';
import './myapp.css';

function Toapp(){
    const [tasks,setTasks] = useState(["hello","there","bye!"]);
    const [newTask,setnewTask] = useState('');
    const [showError, setShowError] = useState(false);
    const [isediting,setisEditing] = useState(false);
    const [currentIndex,setcurrentIndex] = useState(null);
    const handlenewtask = (e)=>{
        setnewTask(e.target.value);
    }
    const addtask = ()=>{
        if(newTask.trim()){
            setTasks(t=>[...t,newTask]);
            setnewTask('');
            setShowError(false);
           
        } else {
            setShowError(true);
        }
    }
    const deletetask = (index)=>{
        const updatedtasks = tasks.filter((_,i)=> i !== index);
        setTasks(updatedtasks);
    }
    const moveup = (index)=>{
        const updatedTasks = [...tasks];
        if(index>0){
            [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    const movedown = (index)=>{
        const updatedTasks = [...tasks];
        if(index < updatedTasks.length-1){
            [updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    const edit = (index)=>{
        setnewTask(tasks[index]);
        setisEditing(true);
        setcurrentIndex(index);
    }
    const update = (currentIndex)=>{
        if(isediting && newTask.trim()){
        const updatedlist = tasks.map((task,i)=>
                i === currentIndex ? newTask:task);
        setTasks(updatedlist);
        setcurrentIndex(null);
        setisEditing(false);
        setnewTask('');
        setShowError(false);   
                    }else if(!newTask.trim()){
                        setShowError(true);
                    }
    }


    return(
    
        <div className='container'>
            <div className='content'>
                <h1>To-Do-List</h1>
                <div className="in">
                <input type="text" placeholder='Enter a task...'
                value={newTask} onChange={handlenewtask}/>
                { isediting ? <button onClick={()=>update(currentIndex)}>UPDATE</button> 
                : <button onClick={addtask}>ADD</button>
                }
                </div>
                {showError && (<p className='error'>Enter a value to add</p>)}
                <ul>
                    {tasks.map((task,index)=>
                    <li key={index}>
                    <button className='up-btn' onClick={()=> moveup(index)}>☝️</button>
                    <button className='down-btn' onClick={()=> movedown(index)}>👇</button>
                    <span className='text'>{task} </span>
                    <button className='update-btn' onClick={()=> edit(index)}>EDIT</button>
                    <button className='delete-btn'onClick={()=>deletetask(index)}>DELETE</button>
                    </li>
                    )}
                    </ul>
            </div>
           
           

        </div>
      
    );
    
}
export default Toapp;