import React, {FC, useEffect, useRef} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Button from "./Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {googleSignInAction} from "../store/actions/authActions";
import {useSelector} from "react-redux";
import {RootState} from "../store";

interface Props {
    onError: (message: string)=>void
}

const SocialLogin: FC<Props> = (props) => {
    const {auth} = useSelector((state: RootState) => state.authState)
    const futureRedirect = useRef<string>("")

    const location = useLocation();
    const navigate = useNavigate();

    async function handleSocialLogin() {
        let redirectPath = location.state || "/";
        try {
            await googleSignInAction()
            futureRedirect.current = redirectPath
        } catch (ex: any) {
            props.onError(ex.message)
        }
    }

    useEffect(() => {
        if (auth && futureRedirect?.current) {
            navigate(futureRedirect?.current)
            futureRedirect.current = ""
        }
    }, [auth])


    return (
        <Button type="button" onClick={handleSocialLogin}
                className="!bg-red-400 flex gap-x-1 items-center w-full justify-center">
            <FontAwesomeIcon icon={faGoogle}/>
            <span>Login With Google</span>
        </Button>
    );
};

export default SocialLogin;