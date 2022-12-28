import {combineReducers, configureStore} from "@reduxjs/toolkit"

import taskReducer from "./reducers/taskReducer"
import authReducer from "./reducers/authReducer";

const reducers = combineReducers({
    authState: authReducer,
    taskState: taskReducer
})

let store = configureStore({
    reducer: reducers
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export default store