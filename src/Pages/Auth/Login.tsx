import React, {SyntheticEvent, useEffect, useRef, useState} from "react";


import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import InputGroup from "../../components/InputGroup";
import Button from "../../components/Button";
import SocialLogin from "../../components/SocialLogin";
import {loginAction} from "../../store/actions/authActions";

import Loader from "../../components/Loader";
import Divider from "../../components/Divider";
import ErrorMessage from "../../components/ErrorMessage";


const Login = () => {

    const {auth} = useSelector((state: RootState) => state.authState)

    const dispatch = useDispatch<AppDispatch>()

    const location = useLocation();
    const navigate = useNavigate();

    const loginSession = useRef(null);

    const [requestLoading, setRequestLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    type DataShape = {
        [key: string]: {
            label: string,
            name: string,
            type: string,
            placeholder: string,
            onChange: (e: SyntheticEvent) => void
        }
    }

    const data: DataShape = {
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
        }
    };

    type DataKey = keyof typeof data

    const [userInput, setUserInput] = useState<{ [Property in DataKey]: any }>({
        email: "",
        password: ""
    });


    function handleChange(e: SyntheticEvent) {
        const {name, value} = e.target as HTMLInputElement;
        setUserInput((prev) => ({...prev, [name]: value}));
        setErrorMessage("")
    }

    async function handleLogin(e: SyntheticEvent) {
        e.preventDefault();
        setRequestLoading(false);
        setErrorMessage("")


        let key: DataKey
        for (key in data) {
            if (!userInput[key].trim()) {
                setErrorMessage(key + " is Required")
                return;
            }
        }

        setRequestLoading(true);

        dispatch(loginAction({
            email: userInput.email.trim(),
            password: userInput.password.trim(),
        }, (error) => {
            if (error) {
                setErrorMessage(error)
                setRequestLoading(false)
            } else {
                // redirect
                let redirectPath = location.state || "/";
                navigate(redirectPath)
            }

            setRequestLoading(false)

        }))

    }

    function handleGoogleLoginError(message: string){
        setErrorMessage(message)
    }

    return (
        <div className="container">


            <div className="mt-12">
                <div className="max-w-md mx-auto shadow-xxs rounded p-4 bg-white m-3 mt-4 rounded-xl">
                    <form onSubmit={handleLogin}>
                        <h1 className="text-center text-2xl py-4 text-dark-900 font-bold">Login</h1>

                        {requestLoading && <Loader className="mt-4"/>}

                        {!requestLoading && <ErrorMessage message={errorMessage}  />}


                        {Object.keys(data).map((key: DataKey) => (
                            <InputGroup {...data[key]} value={userInput[key]}/>
                        ))}



                        <div className="text-dark-100 text-sm font-normal mt-3">
                            <h6>
                                Forgot Password ?
                            </h6>
                        </div>

                        <Button className="mt-4 w-full">Login</Button>
                        <Divider barClass="!h-0.5" text="OR"/>

                        {/**** social login button */}
                        <SocialLogin onError={handleGoogleLoginError}/>


                        <p className="text-center text-sm  mb-4 mt-6 text-dark-300">
                            Not a member
                            <Link
                                to="/registration"
                                state={location.state}
                                className="font-medium !text-primary-500 text-link ml-2 "
                            >
                                Sign up now
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
