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
    let updatedTasks: Task[] = []
    let findTaskIndex = -1
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

        case ActionTypes.TOGGLE_FAVORITE :
            updatedTasks = [...state.tasks]
            findTaskIndex = updatedTasks.findIndex(task => task._id === action.payload)
            if (findTaskIndex === -1) {
                updatedTasks[findTaskIndex].isFavorite = !updatedTasks[findTaskIndex].isFavorite
            }
            return {
                ...state,
                tasks: updatedTasks
            }

        case ActionTypes.TOGGLE_COMPLETED :
            updatedTasks = [...state.tasks]
            findTaskIndex = updatedTasks.findIndex(task => task._id === action.payload)
            if (findTaskIndex === -1) {
                updatedTasks[findTaskIndex].isCompleted = !updatedTasks[findTaskIndex].isCompleted
            }
            return {
                ...state,
                tasks: updatedTasks
            }


        case ActionTypes.DELETE:
            updatedTasks = [...state.tasks]
            return {
                ...state,
                tasks: updatedTasks.filter(task=>task._id !== action.payload)
            }

        default:
            return state;
    }
}

export default taskReducer