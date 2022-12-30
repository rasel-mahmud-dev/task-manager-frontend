import {ActionTypes, TaskActions} from "../actionTypes";
import {setTasksInLocalStorage} from "../actions/taskActions";
import sorting from "../../utilities/sorting";


export interface Task {
    _id?: string
    title: string,
    image: string,
    description: string
    isFavorite: boolean
    date?: Date
    isCompleted: boolean
    isDeleted: boolean
    comment?: string
    createdAt?: Date
    updatedAt?: Date
}

interface TaskState {
    tasks: Task[],
    loadTasks: boolean,
    sort: { field: string, order: number }
}

const taskState: TaskState = {
    tasks: [],
    loadTasks: false,
    sort: { field: "createdAt", order: -1 } // 1 asc and -1 for desc
}


function taskReducer(state = taskState, action: TaskActions) {
    let updatedTasks: Task[] = []
    let findTaskIndex = -1

    switch (action.type) {
        case ActionTypes.FETCH_TASKS :

            updatedTasks = [...action.payload]
            let sortedArr = sorting(updatedTasks, state.sort.field, state.sort.order)

            return {
                ...state,
                loadTasks: true,
                tasks: sortedArr
            }

        case ActionTypes.ADD_TASK :
            updatedTasks = [action.payload, ...state.tasks]
            setTasksInLocalStorage(updatedTasks)
            return {
                ...state,
                tasks: updatedTasks
            }

        case ActionTypes.UPDATE_TASK :
            updatedTasks = [...state.tasks]
            findTaskIndex = updatedTasks.findIndex(task => task._id === action.payload._id)
            if (findTaskIndex !== -1) {
                updatedTasks[findTaskIndex] = action.payload
            }
            setTasksInLocalStorage(updatedTasks)
            return {
                ...state,
                tasks: updatedTasks
            }


        case ActionTypes.TOGGLE_FAVORITE :
            updatedTasks = [...state.tasks]
            findTaskIndex = updatedTasks.findIndex(task => task._id === action.payload)
            if (findTaskIndex !== -1) {
                updatedTasks[findTaskIndex].isFavorite = !updatedTasks[findTaskIndex].isFavorite
            }
            setTasksInLocalStorage(updatedTasks)
            return {
                ...state,
                tasks: updatedTasks
            }

        case ActionTypes.TOGGLE_COMPLETED :
            updatedTasks = [...state.tasks]
            findTaskIndex = updatedTasks.findIndex(task => task._id === action.payload)
            if (findTaskIndex !== -1) {
                updatedTasks[findTaskIndex].isCompleted = !updatedTasks[findTaskIndex].isCompleted
            }
            setTasksInLocalStorage(updatedTasks)
            return {
                ...state,
                tasks: updatedTasks
            }

        case ActionTypes.SORT:
            updatedTasks = [...state.tasks]
            const {field, order} = action.payload
            updatedTasks = sorting(updatedTasks, field, order)

            return {
                ...state,
                tasks: updatedTasks,
                sort: {
                    ...state.sort,
                    field,
                    order
                }
            }



        case ActionTypes.DELETE:
            updatedTasks = [...state.tasks]
            findTaskIndex = updatedTasks.findIndex(task => task._id === action.payload)
            if (findTaskIndex !== -1) {
                updatedTasks[findTaskIndex].isDeleted = !updatedTasks[findTaskIndex].isDeleted
            }
            setTasksInLocalStorage(updatedTasks)
            return {
                ...state,
                tasks: updatedTasks
            }

        default:
            return state;
    }
}

export default taskReducer