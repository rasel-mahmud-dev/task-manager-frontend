import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Task} from "../../store/reducers/taskReducer";
import {AppDispatch, RootState} from "../../store";
import {deleteAction, fetchTasksAction, toggleFavoriteAction} from "../../store/actions/taskActions";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import Ring from "../../components/Ring";
import Button from "../../components/Button";
import {Link} from "react-router-dom";

const MyTask = () => {
    const {taskState: {tasks}} = useSelector((state: RootState) => state)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {

        dispatch(fetchTasksAction())
    }, [])


    return (
        <div className="container">

            <ul className="background">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

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

                <div className="card mx-auto bg-opacity-50 backdrop-blur">

                    <h4 className="font-semibold text-xs uppercase">Starred</h4>
                    {tasks.map((task: Task) => task.isFavorite && (
                        <div key={task._id} className="flex justify-between py-4">
                            <h1>{task.title}</h1>
                            <div className="flex gap-x-2">
                                <Ring className="hover:!bg-red-500" onClick={()=>dispatch(deleteAction(task._id as string))}>
                                    <FontAwesomeIcon className="text-xs " icon={faTrash}/>
                                </Ring>
                                <Ring
                                    onClick={() => dispatch(toggleFavoriteAction(task._id as string))}
                                      className="!bg-blue-500 text-white">
                                    <FontAwesomeIcon className="text-xs " icon={faStar}/>
                                </Ring>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="card mx-auto mt-4 bg-opacity-50 backdrop-blur">
                    <h4 className="font-semibold text-xs uppercase">Not Starred</h4>

                    {tasks.map((task: Task) => !task.isFavorite && (
                        <div key={task._id} className="flex justify-between py-4">
                            <h1>{task.title}</h1>

                            <div className="flex gap-x-2">
                                <Ring className="hover:!bg-red-500" onClick={()=>dispatch(deleteAction(task._id as string))}>
                                    <FontAwesomeIcon className="text-xs " icon={faTrash}/>
                                </Ring>
                                <Ring onClick={() => dispatch(toggleFavoriteAction(task._id as string))}>
                                    <FontAwesomeIcon className="text-xs " icon={faStar}/>
                                </Ring>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyTask;