import {createBrowserRouter} from "react-router-dom";
import Main from "../layout/Main";
import MyTask from "../pages/MyTask/MyTask";
import AddTask from "../pages/AddTask/AddTask";
import HomePage from "../pages/HomePage/HomePage";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import Media from "../pages/Media/Media";
import Detail from "../pages/Detail/Detail";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {path: "/", element: <HomePage/>},
            {path: "/my-tasks", element: <MyTask/>},
            {path: "/tasks/:taskId", element: <Detail/>},
            {path: "/media", element: <Media/>},
            {path: "/add-task", element: <AddTask/>},
            {path: "/edit-task/:taskId", element: <AddTask/>},
            {path: "/login", element: <Login/>},
            {path: "/registration", element: <Registration/>}
        ]
    }
])


export default routes