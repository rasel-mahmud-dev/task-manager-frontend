import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Task} from "../../store/reducers/taskReducer";
import {AppDispatch, RootState} from "../../store";
import {fetchTasksAction, toggleFavoriteAction} from "../../store/actions/taskActions";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import Ring from "../../components/Ring";

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

                <h1 className="font-semibold text-lg pt-6 pb-3">My Tasks</h1>

                <div className="card mx-auto bg-opacity-50 backdrop-blur">

                    <h4 className="font-semibold text-xs uppercase">Starred</h4>
                    {tasks.map((task: Task) => task.isFavorite && (
                        <div key={task._id} className="flex justify-between py-4">
                            <h1>{task.title}</h1>
                            <div className="flex gap-x-2">
                                <Ring className="hover:!bg-red-500">
                                    <FontAwesomeIcon className="text-xs " icon={faTrash}/>
                                </Ring>
                                <Ring onClick={()=>dispatch(toggleFavoriteAction())}>
                                    <FontAwesomeIcon className="text-xs " icon={faStar}/>
                                </Ring>
                            </div>

                        </div>
                    ))}
                </div>
                <div className="card mx-auto mt-4 bg-opacity-50 backdrop-blur">
                    <h4 className="font-semibold text-xs uppercase">Not Stared</h4>

                    {tasks.map((task: Task) => !task.isFavorite && (
                        <div key={task._id} className="flex justify-between py-4">
                            <h1>{task.title}</h1>

                            <div className="flex gap-x-2">
                                <Ring className="hover:!bg-red-500">
                                    <FontAwesomeIcon className="text-xs " icon={faTrash}/>
                                </Ring>
                                <Ring>
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