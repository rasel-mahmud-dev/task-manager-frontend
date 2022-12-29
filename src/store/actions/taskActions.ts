import api from "../../api";
import {Dispatch} from "redux";
import {
    ActionTypes,
    AddTaskAction,
    DeleteAction,
    FetchTasksAction, SortAction,
    ToggleCompleteAction,
    ToggleFavoriteAction, UpdateTaskAction
} from "../actionTypes";
import {Task} from "../reducers/taskReducer";
import {RootState} from "../index";


export const fetchTasksAction = () => async (dispatch: Dispatch<FetchTasksAction>, getState: () => RootState) => {
    try {
        const {auth} = getState().authState

        let tasks = []

        if (auth) {
            let {status, data} = await api().get("/api/v1/tasks")
            if (status === 200) {
                tasks = data
            }
        } else {
            // if user logged in then store their localstorage
            tasks = fetchTasksFromLocalStorage()
        }

        dispatch({
            type: ActionTypes.FETCH_TASKS,
            payload: tasks
        })

    } catch (ex) {
    }
}


// fetch task detail
export function fetchTask<T>(taskId: string) {
    return new Promise<[T | undefined, string | undefined]>(async (resolve, reject) => {
        try {

            let {status, data} = await api().get("/api/v1/tasks/" + taskId)
            if (status === 200) {
                resolve([data, undefined])

            }

        } catch (ex: any) {
            resolve([undefined, ex.message])
        }
    })
}


// add task. when user not logged push on localstorage unless push server
export const addTaskAction = (taskData: Task, callback: () => void) => async (dispatch: Dispatch<AddTaskAction | FetchTasksAction>, getState: () => RootState) => {
    try {
        const {auth} = getState().authState
        if (auth) {
            let {data, status} = await api().post("/api/v1/tasks/add", taskData)
            if (status === 201) {
                dispatch({
                    type: ActionTypes.ADD_TASK,
                    payload: data
                })
                callback && callback()
            }
        } else {
            // if user logged in then store their localstorage
            let tasks = fetchTasksFromLocalStorage()
            tasks.push({...taskData, _id: Date.now().toString(), createdAt: new Date()})
            setTasksInLocalStorage(tasks)
            dispatch({
                type: ActionTypes.FETCH_TASKS,
                payload: tasks
            })
            callback && callback()
        }
    } catch (ex) {

    }
}


// update task. when user not logged push on localstorage unless push server
export const updateTaskAction = (taskData: Task, callback: () => void) => async (dispatch: Dispatch<UpdateTaskAction | FetchTasksAction>, getState: () => RootState) => {
    try {
        const {auth} = getState().authState
        if (auth) {
            let {data, status} = await api().post("/api/v1/tasks/update", taskData)
            if (status === 201) {
                dispatch({
                    type: ActionTypes.UPDATE_TASK,
                    payload: taskData
                })
                callback && callback()
            }
        } else {
            dispatch({
                type: ActionTypes.UPDATE_TASK,
                payload: taskData
            })
            callback && callback()
        }
    } catch (ex) {

    }
}


// toggle task favorite
export const toggleFavoriteAction = (taskId: string, isFavorite: boolean) => async (dispatch: Dispatch<ToggleFavoriteAction>, getState: () => RootState) => {
    try {
        const {auth} = getState().authState
        if (auth) {
            let {data, status} = await api().patch("/api/v1/tasks/toggle-favorite/" + taskId, {isFavorite})
            if (status === 201) {
                dispatch({
                    type: ActionTypes.TOGGLE_FAVORITE,
                    payload: taskId
                })
            }
        } else {
            // if user not logged then change in localstorage data
            dispatch({
                type: ActionTypes.TOGGLE_FAVORITE,
                payload: taskId
            })
        }
    } catch (ex) {

    }
}


// toggle task completed
export const toggleCompleteAction = (taskId: string, isCompleted: boolean) => async (dispatch: Dispatch<ToggleCompleteAction>, getState: () => RootState) => {
    try {
        const {auth} = getState().authState
        if (auth) {
            let {data, status} = await api().patch("/api/v1/tasks/toggle-completed/" + taskId, {isCompleted})
            if (status === 201) {
                dispatch({
                    type: ActionTypes.TOGGLE_COMPLETED,
                    payload: taskId
                })
            }
        } else {
            // if user not logged then change in localstorage data
            dispatch({
                type: ActionTypes.TOGGLE_COMPLETED,
                payload: taskId
            })
        }
    } catch (ex) {

    }
}


// delete task action
export const deleteAction = (taskId: string, isDeleted: boolean) => async (dispatch: Dispatch<DeleteAction>, getState: () => RootState) => {
    try {
        const {auth} = getState().authState
        if (auth) {
            let {data, status} = await api().patch("/api/v1/tasks/delete/" + taskId, {isDeleted})
            if (status === 201) {
                dispatch({
                    type: ActionTypes.DELETE,
                    payload: taskId
                })
            }
        } else {
            // if user not logged then delete from localstorage
            dispatch({
                type: ActionTypes.DELETE,
                payload: taskId
            })
        }
    } catch (ex) {

    }
}


function fetchTasksFromLocalStorage() {
    try {
        let tasks = localStorage.getItem("tasks") || ""
        return JSON.parse(tasks)
    } catch (ex) {
        return []
    }
}


export function setTasksInLocalStorage(tasks: Task[]) {
    localStorage.removeItem("tasks")
    localStorage.setItem("tasks", JSON.stringify(tasks))
}


// sync tasks
export const syncTasksData = () => async (dispatch: Dispatch<FetchTasksAction>, getState: () => RootState) => {
    try {
        let tasks = fetchTasksFromLocalStorage()
        let {data, status} = await api().post("/api/v1/tasks/sync", {tasks})
        if (status === 201) {
            dispatch({
                type: ActionTypes.FETCH_TASKS,
                payload: data
            })

            // remove local cache tasks
            localStorage.removeItem("tasks")
        }

    } catch (ex) {

    }
}




// delete task action
export const sortHandlerAction = (sortData: { field: string, order: number }) :  SortAction => {
    return {
        type: ActionTypes.SORT,
        payload: sortData
    }
}

