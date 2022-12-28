import React, {SyntheticEvent, useEffect, useRef, useState} from "react";


import { Link, useLocation, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import InputGroup from "../../components/InputGroup";
import Button from "../../components/Button";
import SocialLogin from "../../components/SocialLogin";


const Login = () => {

    const { auth } = useSelector((state: RootState)=> state.authState )

    const location = useLocation();
    const navigate = useNavigate();

    const loginSession = useRef(null);

    const [requestLoading, setRequestLoading] = useState(false);
    const [openPasswordResetModal, setOpenPasswordResetModal] = useState(false);


    type DataShape=  {
        [key: string]: {
            label: string,
            name: string,
            type: string,
            placeholder: string,
            onChange: (e: SyntheticEvent)=>void
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


    const [userInput, setUserInput] = useState<{[key: DataKey]: any}>({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    function handleChange(e: SyntheticEvent) {
        const { name, value } = e.target as HTMLInputElement;
        setUserInput((prev) => ({ ...prev, [name]: value }));
    }

    async function handleLogin(e: SyntheticEvent) {
        e.preventDefault();
        setRequestLoading(false);

        let isCompleted = true;
        // check validation before submit form
        let errorMessage = "";
        let tempErrors = { ...errors };
        for (let key in data) {

        }

        if (!isCompleted) {
            setErrors(tempErrors);

            return;
        }

        setRequestLoading(true);
        // try {
        //     let result = await loginAction({
        //         email: userInput.email.trim(),
        //         password: userInput.password.trim(),
        //     });
        //     loginSession.current = true;
        // } catch (ex) {
        //     toast.error(catchErrorMessage(ex));
        //     setRequestLoading(false);
        // } finally {
        //     // setRequestLoading(false);
        // }
    }

    // after auth change then should be redirected
    useEffect(() => {
        // if (auth) {
        //     let redirectPath = location.state || "/";
        //     if (loginSession.current) {
        //         setRequestLoading(false);
        //         navigate(redirectPath);
        //         loginSession.current = false;
        //     } else {
        //         // console.log("redirect home")
        //         navigate("/");
        //     }
        // }
    }, [auth, loginSession.current]);


    return (
        <div className="container">


            <div className="mt-12">
                <div className="max-w-md mx-auto shadow-xxs rounded p-4 bg-white m-3 mt-4 rounded-xl">
                    <form onSubmit={handleLogin}>
                        <h1 className="text-center text-3xl text-dark-900 font-semibold">Login</h1>


                        {Object.keys(data).map((key: DataKey) => (
                            <InputGroup
                                label={data[key].label}
                                name={data[key].name}
                                value={userInput[key]}
                                onChange={handleChange}
                            />
                        ))}


                        <div className="form-control mt-4">
                            <label className="flex gap-x-1 items-center cursor-pointer">
                                <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
                                <span className="label-text">Remember me</span>
                            </label>
                        </div>

                        <div className="text-dark-100 text-sm font-normal mt-5">
                            <h6>
                                Forgot Password ?
                                <label
                                    onClick={() => setOpenPasswordResetModal(true)}
                                    className="link ml-2 text-blue-500 "
                                >
                                    Click to reset
                                </label>
                            </h6>
                        </div>

                        <Button className="mt-4 w-full">Login</Button>
                        <div className="divider text-dark-100 text-sm py-2">OR</div>

                        {/**** social login button */}
                        <SocialLogin onCreateLoginSession={() => {}} />


                        <p className="text-center  mb-4 mt-6 text-dark-300">
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
