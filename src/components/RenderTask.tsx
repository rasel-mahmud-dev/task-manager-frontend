import React, {FC} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle, faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import Ring from "./Ring";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import {Task} from "../store/reducers/taskReducer";
import {deleteAction, toggleCompleteAction, toggleFavoriteAction} from "../store/actions/taskActions";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store";

type RenderTaskProps = {
    task: Task
    className?: string
}


const RenderTask: FC<RenderTaskProps> = ({task, className = ""}) => {

    const dispatch = useDispatch<AppDispatch>()


    function handleFavorite(task: Task) {
        dispatch(toggleFavoriteAction(task._id as string, task.isFavorite))
    }

    function handleDelete(task: Task) {
        dispatch(deleteAction(task._id as string, task.isDeleted))
    }


    function handleToggleComplete(task: Task) {
        dispatch(toggleCompleteAction(task._id as string, task.isCompleted))
    }


    return (
        <div className={`flex justify-between py-4 ${className}`}>
            <h1 className="flex items-center gap-x-1">
                    <span className="cursor-pointer text-neutral-500 hover:text-blue-600">
                        {task.isCompleted ? (
                            <FontAwesomeIcon className="text-blue-600" icon={faCircleCheck}
                                             onClick={() => handleToggleComplete(task)}/>
                        ) : (
                            <FontAwesomeIcon icon={faCircle} onClick={() => handleToggleComplete(task)}/>
                        )}
                    </span>
                {task.title}

            </h1>
            <div className="flex gap-x-2">
                <Ring className="hover:!bg-red-500" onClick={() => handleDelete(task)}>
                    {task.isDeleted ? (
                        <img className="w-5" src="/trash-undo.svg"  alt="undo"/>
                    ) : (
                        <FontAwesomeIcon className="text-xs " icon={faTrash}/>
                    )}


                </Ring>
                <Ring
                    onClick={() => handleFavorite(task)}
                    className={`${task.isFavorite ? "!bg-blue-500 text-white" : ""}`}>
                    <FontAwesomeIcon className="text-xs " icon={faStar}/>
                </Ring>
            </div>

        </div>

    );
};

export default RenderTask;