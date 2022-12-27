import api from "../../api";
import {Dispatch} from "redux";
import {ActionTypes, FetchTasksAction} from "../actionTypes";


export const fetchTasks = ()=> async(dispatch: Dispatch<FetchTasksAction>)=>{
    try {
        let {data} = await api().get("/api/v1/tasks")
        dispatch({
            type: ActionTypes.FETCH_TASKS,
            payload: data
        })

    }catch (ex){}

}