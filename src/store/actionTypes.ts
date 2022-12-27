import {Task} from "./reducers/taskReducer";

export enum ActionTypes{
    ADD_TASK = "ADD_TASK",
    FETCH_TASKS = "FETCH_TASKS",
    TOGGLE_TASK = "TOGGLE_TASK",
    TOGGLE_FAVORITE = "TOGGLE_FAVORITE",
    TOGGLE_COMPLETED = "TOGGLE_COMPLETED",
    DELETE = "DELETE",
}


export type FetchTasksAction = {
    type: ActionTypes.FETCH_TASKS
    payload: Task[]
}

export type AddTaskAction = {
    type: ActionTypes.ADD_TASK
    payload: Task
}

export type ToggleFavoriteAction = {
    type: ActionTypes.TOGGLE_FAVORITE,
    payload: string
}

export type ToggleCompleteAction = {
    type: ActionTypes.TOGGLE_COMPLETED,
    payload: string
}

export type DeleteAction = {
    type: ActionTypes.DELETE,
    payload: string
}

export type TaskActions = FetchTasksAction | AddTaskAction | ToggleFavoriteAction | ToggleCompleteAction | DeleteAction