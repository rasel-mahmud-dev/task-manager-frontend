import React, {SyntheticEvent, useEffect, useRef, useState} from "react";


import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import InputGroup from "../../components/InputGroup";
import Button from "../../components/Button";
import SocialLogin from "../../components/SocialLogin";
import {loginAction, registrationAction} from "../../store/actions/authActions";

import Loader from "../../components/Loader";
import Divider from "../../components/Divider";
import ImageChooser from "../../components/ImageChooser";
import fileUpload from "../../utilities/fileUpload";
import ErrorMessage from "../../components/ErrorMessage";


const Registration = () => {

    const {auth} = useSelector((state: RootState) => state.authState)

    const dispatch = useDispatch<AppDispatch>()

    const location = useLocation();
    const navigate = useNavigate();

    const [requestLoading, setRequestLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    type DataShape = {
        [key: string]: {
            label: string,
            name: string,
            type?: string,
            placeholder: string,
            onChange: (e: SyntheticEvent) => void
        }
    }

    const data: DataShape = {

        username: {
            label: "Username",
            name: "username",
            placeholder: "Enter username",
            onChange: handleChange
        },

        email: {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter email",
            onChange: handleChange
        },

        password: {
            label: "Password",
            type: "password",
            name: "password",
            placeholder: "Enter password",
            onChange: handleChange
        },

        avatar: {
            label: "Choose Avatar",
            name: "avatar",
            placeholder: "Choose Avatar",
            onChange: handleChange
        }
    };

    type DataKey = keyof typeof data

    const [userInput, setUserInput] = useState<{ [Property in DataKey]: any }>({
        username: "",
        avatar: "",
        email: "",
        password: ""
    });


    function handleChange(e: SyntheticEvent) {
        const {name, value} = e.target as HTMLInputElement;
        setUserInput((prev) => ({...prev, [name]: value}));
        setErrorMessage("")
    }

    async function handleRegistration(e: SyntheticEvent) {
        e.preventDefault();
        setRequestLoading(false);
        setErrorMessage("")


        let key: DataKey
        for (key in data) {

            if (key === "avatar") {

                if (!userInput[key]) {
                    setErrorMessage(key + " is Required")
                    return;
                } else if(userInput[key] && userInput[key].size > (200 * 1024)){
                    setErrorMessage("Image size should be under 200kb")
                    return;
                }

            } else {
                if (!userInput[key].trim()) {
                    setErrorMessage(key + " is Required")
                    return;
                }
            }
        }


        try {

            setRequestLoading(true);

            const [result, error] = await fileUpload(userInput.avatar as Blob)
            if(!result || error){
                setRequestLoading(false);
                setErrorMessage("Image upload fail, Please try again")
                return;
            }
            dispatch(
                registrationAction({
                    email: userInput.email.trim(),
                    avatar: result.url,
                    password: userInput.password.trim(),
                    username: userInput.username.trim()
                }, function (err) {
                    if (err) {
                        setErrorMessage(err)
                        setRequestLoading(false)
                        return;
                    }

                    // redirect
                    let redirectPath = location.state || "/";
                    navigate(redirectPath)

                }))


        } catch (ex: any) {
            setErrorMessage(ex)

        } finally {
            setRequestLoading(false);
        }
    }


    function handleGoogleLoginError(message: string){
        setErrorMessage(message)
    }


    return (
        <div className="container">


            <div className="mt-12">
                <div className="max-w-md mx-auto shadow-xxs rounded p-4 card m-3 mt-4 rounded-xl">
                    <form onSubmit={handleRegistration}>
                        <h1 className="card-title">Registration Form</h1>

                        {requestLoading && <Loader className="mt-4"/>}
                        {!requestLoading && <ErrorMessage message={errorMessage}  />}

                        {Object.keys(data).map((key: DataKey) => key !== "avatar" ? (
                            <InputGroup {...data[key]} value={userInput[key]} />
                        ) : (
                            <ImageChooser
                                {...data[key]}
                                className={"!flex-col"}
                                previewImageClass="avatar-preview-div"
                            />
                        ))}


                        <div className="text-dark-100 text-sm font-normal mt-3">
                            <h6>
                                Forgot Password ?
                            </h6>
                        </div>

                        <Button className="mt-4 w-full">Registration</Button>

                        <Divider barClass="!h-0.5" text="OR"/>

                        {/**** social login button */}
                        <SocialLogin onError={handleGoogleLoginError}/>


                        <p className="text-center  text-sm mb-4 mt-6 text-dark-300 dark:text-dark-200">
                            Already have an account
                            <Link
                                to="/login"
                                state={location.state}
                                className="font-medium !text-primary-500 text-link ml-2 "
                            >
                                Login now
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
