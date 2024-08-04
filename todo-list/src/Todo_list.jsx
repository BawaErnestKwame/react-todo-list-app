import React, {useState} from 'react'

function Todo_list(){
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState('')

    function handleInputChange(event){
        setNewTask(event.target.value);

    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask])
        setNewTask("")
        }


        

    }

    function deleteTask(index){
        const updateTasks = tasks.filter((_,i) => i !== index);
        setTasks(updateTasks);

    }

    function moveTaskUp(index){
        if(index > 0){
            const updateTasks = [...tasks];
            [updateTasks[index], updateTasks[index - 1]]=
            [updateTasks[index -1], updateTasks[index]];
            setTasks(updateTasks);

        }
        
    }
    function moveTaskDown(index){
        if(index < tasks.length -1){
            const updateTasks = [...tasks];
            [updateTasks[index], updateTasks[index + 1]]=
            [updateTasks[index +1], updateTasks[index]];
            setTasks(updateTasks);
        }


    }

    return(
        <div className='todo_list'>
            <h1>TO-DO-LIST APP</h1>

            <div>
                <input type="text" 

                placeholder='Enter a task...'
                value={newTask}
                onChange={handleInputChange}
                
                />

                <button onClick={addTask} 
                
                className='addTask'>Add Task</button>

                
                


            </div>

            <ol>
                {
                    tasks.map( (task,index) =>
                        <li key={index}>
                            <span className='text' >{task}</span>

                            <button className='delete_btn'  onClick={() => deleteTask(index)}>Delete</button>

                            <button className='move_btn'  onClick={() => moveTaskUp(index)}>Up</button>

                            <button className='move_btn'  onClick={() => moveTaskDown(index)}>Down</button>
                        
                        </li>
                
                    )
                }
            </ol>

        </div>
    )

}
export default Todo_list