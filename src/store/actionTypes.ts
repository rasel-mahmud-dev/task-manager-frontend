import {Task} from "./reducers/taskReducer";
import {Auth} from "./reducers/authReducer";

export enum ActionTypes{
    ADD_TASK = "ADD_TASK",
    UPDATE_TASK = "UPDATE_TASK",
    FETCH_TASKS = "FETCH_TASKS",
    TOGGLE_TASK = "TOGGLE_TASK",
    TOGGLE_FAVORITE = "TOGGLE_FAVORITE",
    TOGGLE_COMPLETED = "TOGGLE_COMPLETED",
    DELETE = "DELETE",
    LOGIN = "LOGIN",
}


export type FetchTasksAction = {
    type: ActionTypes.FETCH_TASKS
    payload: Task[]
}

export type AddTaskAction = {
    type: ActionTypes.ADD_TASK
    payload: Task
}

export type UpdateTaskAction = {
    type: ActionTypes.UPDATE_TASK
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

export type TaskActions = FetchTasksAction | AddTaskAction | ToggleFavoriteAction | ToggleCompleteAction | DeleteAction | UpdateTaskAction







export type LoginAction = {
    type: ActionTypes.LOGIN,
    payload: Auth
}

export type AuthActions = LoginAction