import {createBrowserRouter} from "react-router-dom";
import Main from "../layout/Main";
import MyTask from "../pages/MyTask/MyTask";
import AddTask from "../pages/AddTask/AddTask";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {path: "/tasks", element: <MyTask/>},
            {path: "/add-task", element: <AddTask/>}
        ]
    }
])


export default routes