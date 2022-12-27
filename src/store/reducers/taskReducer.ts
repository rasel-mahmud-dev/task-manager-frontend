import {ActionTypes, TaskActions} from "../actionTypes";
import store from "../index";


export interface Task {
    _id?: string
    title: string,
    image: string,
    description: string
    isFavorite: boolean
    date?: Date
    isCompleted: boolean
    comment?: string
    createdAt?: Date
    updatedAt?: Date
}

interface TaskState {
    tasks: Task[]
}

const taskState: TaskState = {
    tasks: []
}


function taskReducer(state = taskState, action: TaskActions) {
    switch (action.type) {
        case ActionTypes.FETCH_TASKS :
            return {
                ...state,
                tasks: action.payload
            }

        case ActionTypes.ADD_TASK :
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }

        default:
            return state;
    }
}

export default taskReducer