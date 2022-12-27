import {ActionTypes, TaskActions} from "../actionTypes";


export interface Task {
    title: string,
    image: string,
    isCompleted: boolean
    comment?: string

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
    }
}

export default taskReducer