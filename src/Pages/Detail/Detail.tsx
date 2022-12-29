import React, {useEffect, useState} from 'react';
import BgAnimation from "../../components/BgAnimation/BgAnimation";
import {Link, useParams} from "react-router-dom";
import Button from "../../components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {deleteAction, fetchTask, toggleFavoriteAction} from "../../store/actions/taskActions";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import {Task} from "../../store/reducers/taskReducer";
import Ring from "../../components/Ring";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";

const Detail = () => {

    const {taskId} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const [taskDetail, setTaskDetail] = useState<Task>(null as unknown as Task)

    useEffect(() => {
        if (taskId) {
            (async function(){
                let [data, error] = await fetchTask<Task>(taskId)
                if(!error && data){
                    setTaskDetail(data)
                }
            }())
        }
    }, [taskId])


    function handleFavorite(task: Task) {
        setTaskDetail((p)=>{
            return {
                ...p,
                isFavorite: !p.isFavorite
            }
        })

        dispatch(toggleFavoriteAction(task._id as string, task.isFavorite))
    }

    function handleDelete(task: Task) {
        dispatch(deleteAction(task._id as string, task.isDeleted))
    }


    return (
        <div className="container">

            <BgAnimation/>


            <div className="max-w-3xl mx-auto">

                <div className="pt-6 pb-3">
                    <h1 className="font-semibold text-lg ">My Details</h1>
                </div>


                { taskDetail ? <div className="card">
                    <div>
                        <div className="flex justify-between border-b pb-2">
                        <h4 className="text-xl font-semibold">{taskDetail.title}</h4>
                            <Ring
                                onClick={() => handleFavorite(taskDetail)}
                                className={`${taskDetail.isFavorite ? "!bg-blue-500 text-white" : ""}`}>
                                <FontAwesomeIcon className="text-xs " icon={faStar}/>
                            </Ring>

                        </div>
                        <p className="mt-4 pb-6">{taskDetail.description}</p>

                        <div className="w-40 text-sm">
                            <img className="w-full" src={taskDetail?.image} alt="task-image"/>
                        </div>


                        <div className="border-t pt-2">
                            <h5 className="font-medium text-sm text-dark-300"> <span className="text-dark-800">Added On</span> {new Date(taskDetail?.createdAt || "").toDateString()}</h5>
                        </div>


                    </div>
                </div> : (
                    <div className="card text-center">
                        <h4 className="text-xl font-semibold mb-3">Task not found</h4>
                        <Link to="/my-tasks" className=""><Button>Go to My Tasks</Button></Link>
                    </div>
                )}


            </div>
        </div>
    );
};

export default Detail;