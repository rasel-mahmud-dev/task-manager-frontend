import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {Task} from "../../store/reducers/taskReducer";
import {RootState} from "../../store";


const MyTask = () => {
    const {taskState: { tasks }} = useSelector((state: RootState)=>state)

    useEffect(()=>{

    }, [])


    return (
        <div>
            {tasks.map((task: Task)=>(
                <div key={task._id}>
                    <h1>{task.title}</h1>
                </div>
            ))}
        </div>
    );
};

export default MyTask;