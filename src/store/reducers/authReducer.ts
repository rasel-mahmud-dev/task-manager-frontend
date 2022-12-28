import {ActionTypes, AuthActions } from "../actionTypes";

export interface Auth {
    _id?: string
    username: string,
    email: string,
    avatar?: string,
    createdAt?: Date
    updatedAt?: Date
}

interface TaskState {
    auth: Auth | null,
    authLoading: boolean
}

const authState: TaskState = {
    auth: null,
    authLoading: false
}


function authReducer(state = authState, action: AuthActions) {

    switch (action.type) {
        case ActionTypes.LOGIN :
            return {
                ...state,
                authLoading: true,
                auth: action.payload
            }

        default:
            return state;
    }
}

export default authReducer