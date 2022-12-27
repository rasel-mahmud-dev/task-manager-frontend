import api from "../../api";
import {Dispatch} from "redux";
import {ActionTypes, AddTaskAction, FetchTasksAction} from "../actionTypes";
import {Task} from "../reducers/taskReducer";


export const fetchTasksAction = ()=> async(dispatch: Dispatch<FetchTasksAction>)=>{
    try {
        let {data} = await api().get("/api/v1/tasks")
        dispatch({
            type: ActionTypes.FETCH_TASKS,
            payload: data
        })

    }catch (ex){}

}




export const addTaskAction = (taskData: Task)=> async(dispatch: Dispatch<AddTaskAction>)=>{
    try {
        let {data, status} = await api().post("/api/v1/tasks/add", taskData)
        if(status === 201) {
            dispatch({
                type: ActionTypes.ADD_TASK,
                payload: data.message
            })
        }
    }catch (ex){}

}