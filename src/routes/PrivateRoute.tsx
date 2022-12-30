import React, { ReactNode} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import Loader from "../components/Loader";
import {Navigate, useLocation} from "react-router-dom";




const PrivateRoute = (props: { children: ReactNode } ) => {
    const {auth,  authLoading } = useSelector((state: RootState)=>state.authState)

    const location = useLocation();

    if(!authLoading) {
        return  <Loader />
    }

    if(authLoading && !auth){
        return <Navigate to="/login" state={location.pathname} />
    }

    return props.children
};

export default PrivateRoute;