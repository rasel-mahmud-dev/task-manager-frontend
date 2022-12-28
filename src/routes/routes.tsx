import {createBrowserRouter} from "react-router-dom";
import Main from "../layout/Main";
import MyTask from "../pages/MyTask/MyTask";
import AddTask from "../pages/AddTask/AddTask";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Auth/Login";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {path: "/", element: <HomePage/>},
            {path: "/my-tasks", element: <MyTask/>},
            {path: "/add-task", element: <AddTask/>},
            {path: "/login", element: <Login/>}
        ]
    }
])


export default routes