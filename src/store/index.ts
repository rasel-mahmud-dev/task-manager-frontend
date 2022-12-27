import {combineReducers, configureStore} from "@reduxjs/toolkit"

import taskReducer from "./reducers/taskReducer"

const reducers = combineReducers({
    taskState: taskReducer
})

let store = configureStore({
    reducer: reducers
})

export default store