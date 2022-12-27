import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Task} from "../../store/reducers/taskReducer";
import {AppDispatch, RootState} from "../../store";
import {fetchTasksAction} from "../../store/actions/taskActions";


const MyTask = () => {
    const {taskState: { tasks }} = useSelector((state: RootState)=>state)
        const dispatch = useDispatch<AppDispatch>()

    useEffect(()=>{

        dispatch(fetchTasksAction())
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