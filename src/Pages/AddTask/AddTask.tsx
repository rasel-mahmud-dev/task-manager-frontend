import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Task} from "../../store/reducers/taskReducer";
import {AppDispatch, RootState} from "../../store";
import {addTaskAction, fetchTasksAction} from "../../store/actions/taskActions";
import InputGroup from "../../components/InputGroup";
import Button from "../../components/Button";
import {SyntheticEventData} from "react-dom/test-utils";
import ErrorMessage from "../../components/ErrorMessage";
import {useNavigate} from "react-router-dom";


const AddTask = () => {
    const {taskState: {tasks}} = useSelector((state: RootState) => state)
    const dispatch = useDispatch<AppDispatch>()

    const [newTaskData, setNewTaskData] = useState<Task>({
        comment: "",
        date: undefined,
        description: "",
        image: "",
        isCompleted: false,
        isFavorite: false,
        title: "",
    })

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("")


    function handleChange(e: SyntheticEvent) {
        setErrorMessage("")
        setNewTaskData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    function handleAddTask(e: SyntheticEvent) {
        e.preventDefault()

        let requitedFields = ["title", "description"]
        let errorMessage = ""
        requitedFields.forEach(field => {
            if (!newTaskData[field]) {
                errorMessage = field + " Required"
                return;
            }
        })

        if (errorMessage) {
            setErrorMessage(errorMessage)
            return;
        }
        dispatch(addTaskAction(newTaskData, ()=>{
            navigate("/my-tasks")
        }))
    }


    return (
        <div className="container">
            <div className="max-w-md mx-auto card">
                <h1 className="text-3xl font-bold text-center">Add Task</h1>

                <ErrorMessage message={errorMessage}/>

                <form onSubmit={handleAddTask}>
                    <InputGroup
                        onChange={handleChange}
                        name="title"
                        placeholder="Task title"
                        label="Title"
                        value={newTaskData.title}
                    />
                    <InputGroup
                        as="textarea"
                        onChange={handleChange} name="description"
                        placeholder="Task Description"
                        value={newTaskData.description}
                        label="Task Description"
                    />
                    <Button className="block mx-auto w-full mt-4">Add Task</Button>
                </form>


            </div>
        </div>
    );
};

export default AddTask;