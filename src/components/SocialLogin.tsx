import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Button from "./Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";

const SocialLogin = ({onCreateLoginSession}) => {
    // const [{ state, actions }]  = useStore();

    const location = useLocation();
    const navigate = useNavigate();

    async function handleSocialLogin (){
        // try {
        //     let user = await actions.googleSignInAction()
        //     if(user) {
        //         onCreateLoginSession && onCreateLoginSession()
        //     } else {
        //         toast.error("Google Login fail");
        //     }
        // } catch (ex) {
        //     toast.error(catchErrorMessage(ex));
        // }
    }

    return (
        <Button type="button" onClick={handleSocialLogin} className="!bg-red-400 flex gap-x-1 items-center w-full justify-center">
            <FontAwesomeIcon icon={faGoogle} />
            <span>Login With Google</span>
        </Button>
    );
};

export default SocialLogin;