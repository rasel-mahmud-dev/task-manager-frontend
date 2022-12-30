import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {fetchTasksAction} from "../../store/actions/taskActions";
import BgAnimation from "../../components/BgAnimation/BgAnimation";
import {Link} from "react-router-dom";
import Button from "../../components/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader";

const Media = () => {

    const {tasks, loadTasks} = useSelector((state: RootState) => state.taskState)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (tasks.length === 0) {
            dispatch(fetchTasksAction())
        }
    }, [])

    return (

        <div className="container">
            <div className="max-w-3xl mx-auto">
                <BgAnimation/>


                <div className="max-w-3xl mx-auto">

                    <div className="pt-6 pb-3 flex justify-between items-center">
                        <h1 className="card-title">Media</h1>
                        <Link to="/add-task">
                            <Button className="flex items-center gap-x-1 text-sm px-3">
                                <FontAwesomeIcon icon={faPlus}/>
                                New Task
                            </Button>
                        </Link>
                    </div>

                    { !loadTasks && <Loader /> }

                    <div className="masonry-gallery gap-4">
                        {tasks?.map(task => (
                            <div className="card">
                                <div className="w-40 mx-auto text-sm">
                                    <img className="w-full" src={task?.image} alt="task-image"/>
                                </div>
                                <h4 className="text-sm text-dark-300 dark:text-dark-50 text-center font-normal py-4 break-all">{task.title}</h4>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Media;