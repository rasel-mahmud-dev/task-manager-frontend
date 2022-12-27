import {Task} from "./reducers/taskReducer";

export enum ActionTypes{
    ADD_TASK = "ADD_TASK",
    FETCH_TASKS = "FETCH_TASKS",
    TOGGLE_TASK = "TOGGLE_TASK",
}


export type FetchTasksAction = {
    type: ActionTypes.FETCH_TASKS
    payload: Task[]
}

export type TaskActions = FetchTasksAction