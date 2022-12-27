import React, {ReactNode, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Task} from "../../store/reducers/taskReducer";
import {AppDispatch, RootState} from "../../store";
import {
    fetchTasksAction,
} from "../../store/actions/taskActions";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import {Link} from "react-router-dom";
import BgAnimation from "../../components/BgAnimation/BgAnimation";
import RenderTask from "../../components/RenderTask";

const MyTask = () => {
    const {taskState: {tasks}} = useSelector((state: RootState) => state)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchTasksAction())
    }, [])


    const tabs = [
        {label: "Active List", render: renderCurrentList},
        {label: "Completed", render: renderCompleted},
        {label: "Deleted", render: renderDeleted},
    ]

    const [currentTab, setCurrentTab] = useState<{
        render: ()=> ReactNode,
        label: string
    } | null>(null)


    useEffect(()=>{
        if(currentTab === null && tasks.length > 0){
            setCurrentTab(tabs[0])
        }
    }, [tasks])



    function renderCurrentList() {
        return (
            <>
                <div className="card mx-auto bg-opacity-50 backdrop-blur">
                    <h4 className="font-semibold text-xs uppercase">Starred</h4>
                    {tasks.map((task: Task) => (!task.isCompleted && !task.isDeleted && task.isFavorite) && (
                        <RenderTask task={task} key={task._id}/>
                    ))}
                </div>

                <div className="card mx-auto mt-4 bg-opacity-50 backdrop-blur">
                    <h4 className="font-semibold text-xs uppercase">Not Starred</h4>
                    {tasks.map((task: Task) => (!task.isCompleted && !task.isDeleted && !task.isFavorite) && (
                        <RenderTask task={task} key={task._id}/>
                    ))}
                </div>
            </>
        )
    }

    function renderCompleted() {
        return <>
            <h4 className="font-semibold text-xs uppercase mt-10">Completed</h4>
            <div className="card mx-auto mt-4 bg-opacity-50 backdrop-blur">
                <h4 className="font-semibold text-xs uppercase">Not Starred</h4>
                {tasks.map((task: Task) => !task.isDeleted && task.isCompleted && (
                    <RenderTask task={task} key={task._id}/>
                ))}
            </div>
        </>
    }

    function renderDeleted() {
        return <>
            <h4 className="font-semibold text-xs uppercase mt-10">Recent Deleted Task</h4>
            <div className="card mx-auto mt-4 bg-opacity-50 backdrop-blur">
                {tasks.map((task: Task) => task.isDeleted && (
                    <RenderTask className="opacity-40" task={task} key={task._id}/>
                ))}
            </div>
        </>
    }


    return (
        <div className="container">

            <BgAnimation/>


            <div className="max-w-3xl mx-auto">

                <div className="pt-6 pb-3 flex justify-between items-center">
                    <h1 className="font-semibold text-lg ">My Tasks</h1>
                    <Link to="/add-task">
                        <Button className="flex items-center gap-x-1 text-sm px-3">
                            <FontAwesomeIcon icon={faPlus}/>
                            New Task
                        </Button>
                    </Link>
                </div>


               <div className='card flex justify-between bg-opacity-50 backdrop-blur mb-4'>
                   <div className="flex items-center gap-x-4">
                       {tabs.map((tab) => (
                           <li onClick={() => setCurrentTab(tab)}
                               className={` text-sm font-semibold list-none cursor-pointer ${currentTab?.label === tab.label ? "text-blue-600 font-medium" : ""}`}>{tab.label}</li>
                       ))}
                   </div>
                   <li className={`list-none cursor-pointer text-sm font-semibold `}>
                       <Link to="/add-task">
                           <FontAwesomeIcon className="text-xs mr-1" icon={faPlus} />
                           Add
                       </Link>
                   </li>
               </div>

                { currentTab?.render() }


            </div>
        </div>
    );
};

export default MyTask;