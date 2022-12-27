import api from "../../api";
import {Dispatch} from "redux";
import {
    ActionTypes,
    AddTaskAction,
    DeleteAction,
    FetchTasksAction,
    ToggleCompleteAction,
    ToggleFavoriteAction
} from "../actionTypes";
import {Task} from "../reducers/taskReducer";


export const fetchTasksAction = () => async (dispatch: Dispatch<FetchTasksAction>) => {
    try {
        let {data} = await api().get("/api/v1/tasks")
        dispatch({
            type: ActionTypes.FETCH_TASKS,
            payload: data
        })

    } catch (ex) {
    }
}


export const addTaskAction = (taskData: Task) => async (dispatch: Dispatch<AddTaskAction>) => {
    try {
        let {data, status} = await api().post("/api/v1/tasks/add", taskData)
        if (status === 201) {
            dispatch({
                type: ActionTypes.ADD_TASK,
                payload: data.message
            })
            callback && callback()
        }
    } catch (ex) {

    }
}


// toggle task favorite
export const toggleFavoriteAction = (taskId: string) => async (dispatch: Dispatch<ToggleFavoriteAction>) => {
    try {
        let {data, status} = await api().patch("/api/v1/tasks/toggle-favorite/" + taskId)
        if (status === 201) {
            dispatch({
                type: ActionTypes.TOGGLE_FAVORITE,
                payload: taskId
            })
        }
    } catch (ex) {

    }
}



// toggle task completed
export const toggleCompleteAction = (taskId: string) => async (dispatch: Dispatch<ToggleCompleteAction>) => {
    try {
        let {data, status} = await api().patch("/api/v1/tasks/toggle-complete/" + taskId)
        if (status === 201) {
            dispatch({
                type: ActionTypes.TOGGLE_COMPLETED,
                payload: taskId
            })
        }
    } catch (ex) {

    }


}


// delete task action
export const deleteAction = (taskId: string) => async (dispatch: Dispatch<DeleteAction>) => {
    try {
        let {data, status} = await api().delete("/api/v1/tasks/" + taskId)
        if (status === 201) {
            dispatch({
                type: ActionTypes.DELETE,
                payload: taskId
            })
        }
    } catch (ex) {

    }

}