import React, {ReactNode, SyntheticEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Task} from "../../store/reducers/taskReducer";
import {AppDispatch, RootState} from "../../store";

import {
    fetchTasksAction, sortHandlerAction,
} from "../../store/actions/taskActions";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faSort, faTrash, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import {Link, useLocation, useNavigate, useNavigation} from "react-router-dom";
import BgAnimation from "../../components/BgAnimation/BgAnimation";
import RenderTask from "../../components/RenderTask";


const MyTask = () => {
    const {taskState: {tasks, sort}} = useSelector((state: RootState) => state)
    const dispatch = useDispatch<AppDispatch>()

    const location = useLocation();

    useEffect(() => {
        if (tasks.length === 0) {
            dispatch(fetchTasksAction())
        }
    }, [])


    const tabs = [
        {label: "Active List", render: renderCurrentList},
        {label: "Completed", render: renderCompleted},
        {label: "Deleted", render: renderDeleted},
    ]

    const [currentTab, setCurrentTab] = useState<number>(0)


    useEffect(() => {
        if (location.state && location.state.tab !== undefined) {
            setCurrentTab(location.state.tab)

        } else {
            if (currentTab === null && tasks?.length > 0) {
                setCurrentTab(0)
            }
        }
        location.state = null
    }, [tasks, location.state])


    function renderCurrentList() {
        return (
            <>
                <div className="card mx-auto bg-opacity-50 backdrop-blur">
                    <h4 className="font-semibold text-xs uppercase">Starred</h4>
                    {tasks.map((task: Task) => (!task.isCompleted && !task.isDeleted && task.isFavorite) && (
                        <RenderTask updateEnabled={true} task={task} key={task._id}/>
                    ))}
                </div>

                <div className="card mx-auto mt-4 bg-opacity-50 backdrop-blur">
                    <h4 className="font-semibold text-xs uppercase">Not Starred</h4>
                    {tasks.map((task: Task) => (!task.isCompleted && !task.isDeleted && !task.isFavorite) && (
                        <RenderTask updateEnabled={true} task={task} key={task._id}/>
                    ))}
                </div>
            </>
        )
    }

    function renderCompleted() {
        return <>
            <h4 className="font-semibold text-xs uppercase mt-10">Completed</h4>
            <div className="card mx-auto mt-4 bg-opacity-50 backdrop-blur">
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

    function changeSortByField(e: SyntheticEvent) {
        let target = e.target as HTMLSelectElement
        dispatch((sortHandlerAction({
            ...sort,
            field: target.value
        })))
    }

    function changeSortOrder() {
        dispatch((sortHandlerAction({
            ...sort,
            order: sort.order === 1 ? -1 : 1
        })))
    }


    // render sorting template
    function renderSortPanel() {
        return (
            <div className="mt-2 mb-4">
                <div className="flex justify-between items-center text-sm font-medium">
                    <div className="flex items-center gap-x-2">
                        <FontAwesomeIcon className="text-sm" icon={faSort}/>
                        <h4 className="text-sm font-medium">Sort By</h4>
                        <select onChange={changeSortByField} value={sort.field}
                                className="outline-none border border-blue-600/60 rounded bg-transparent text-dark-300 text-sm py-1 px-1.5 ">
                            <option value="title">Title</option>
                            <option value="createdAt">Added</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-x-2" onClick={changeSortOrder}>
                        {sort.order === 1 ? (
                            <FontAwesomeIcon className="text-sm" icon={faSortDown}/>
                        ) : (
                            <FontAwesomeIcon className="text-sm" icon={faSortUp}/>
                        )}
                        <h4 className="text-sm font-medium">Order By</h4>
                    </div>
                </div>
            </div>
        )
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
                        {tabs.map((tab, index) => (
                            <li key={tab.label} onClick={() => setCurrentTab(index)}
                                className={` text-sm font-semibold list-none cursor-pointer ${currentTab === index ? "text-blue-600 font-medium" : ""}`}>{tab.label}</li>
                        ))}
                    </div>
                    <li className={`list-none cursor-pointer text-sm font-semibold `}>
                        <Link to="/add-task">
                            <FontAwesomeIcon className="text-xs mr-1" icon={faPlus}/>
                            Add
                        </Link>
                    </li>
                </div>

                {renderSortPanel()}

                {tabs.map((tab, index) => (
                    <div>
                        {currentTab === index && tab.render()}
                    </div>
                ))}


            </div>
        </div>
    );
};

export default MyTask;