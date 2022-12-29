import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Task} from "../../store/reducers/taskReducer";
import {AppDispatch, RootState} from "../../store";
import {addTaskAction, fetchTask, fetchTasksAction, updateTaskAction} from "../../store/actions/taskActions";
import InputGroup from "../../components/InputGroup";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import {useNavigate, useParams} from "react-router-dom";
import ImageChooser from "../../components/ImageChooser";
import fileUpload from "../../utilities/fileUpload";
import Loader from "../../components/Loader";


const AddTask = () => {
    const {taskState: {tasks}} = useSelector((state: RootState) => state)
    const dispatch = useDispatch<AppDispatch>()

    const {taskId} = useParams()


    const [newTaskData, setNewTaskData] = useState<Task>({
        _id: "",
        createdAt: undefined,
        isDeleted: false,
        updatedAt: undefined,
        comment: "",
        date: undefined,
        description: "",
        image: "",
        isCompleted: false,
        isFavorite: false,
        title: ""
    })

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState("")
    const [requestLoading, setRequestLoading] = useState(false);


    useEffect(()=>{
        if(!taskId) return;

        (async function(){
            let [taskDetails, error]  = await fetchTask<Task>(taskId)
            if(taskDetails &&  !error){
                setNewTaskData(taskDetails)
            }
        }())
    }, [taskId])


    type Key  = keyof Task
    function handleChange(e: SyntheticEvent) {
        setErrorMessage("")
        let target = e.target as HTMLInputElement
        setNewTaskData(prevState => ({
            ...prevState,
            [target.name as Key]: target.value
        }))
    }


    async function handleAddTask(e: SyntheticEvent) {
        e.preventDefault()
        setRequestLoading(false);
        let requitedFields: Key[] = ["title", "description", "image"]

        let errorMessage = ""
        requitedFields.forEach(field => {
            if (!newTaskData[field]) {
                if(!errorMessage) {
                    errorMessage = field + " Required"
                }
            }
        })

        if(errorMessage) return setErrorMessage(errorMessage)

        let image = newTaskData.image as unknown as Blob
        if(image && image.size > (200 * 1024)){
            setErrorMessage("Image size should be under 200kb")
            return;
        }

        setRequestLoading(true);

        const [result, error] = await fileUpload(image)
        if(error){
            setErrorMessage("Image upload fail, Please try again")
            setRequestLoading(false);
            return;
        }

        if(taskId){
        // update task
            dispatch(updateTaskAction({
                ...newTaskData,
                image: result?.url || ""
            }, () => {
                navigate("/my-tasks")
            }))

        } else {
            // add new task
            dispatch(addTaskAction({
                ...newTaskData,
                image: result?.url || ""
            }, () => {
                navigate("/my-tasks")
            }))
        }
    }

    return (
        <div className="container py-10">
            <div className="max-w-md mx-auto card">
                <h1 className="text-3xl font-bold text-center">{taskId ? "Update Task" : "Add Task"}</h1>

                {requestLoading && <Loader className="mt-4"/>}
                {!requestLoading && <ErrorMessage message={errorMessage}  />}

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

                    <ImageChooser
                        name="image"
                        label="Task Image"
                        onChange={handleChange}
                        className={"!flex-col"}
                        defaultValue={newTaskData.image}
                        previewImageClass="avatar-preview-div"
                    />

                    <Button className="block mx-auto w-full mt-4">{taskId ? "Update Task" : "Add Task" }</Button>
                </form>


            </div>
        </div>
    );
};

export default AddTask;