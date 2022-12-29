import {Outlet} from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import {useEffect} from "react";
import {getAuth} from "firebase/auth";
import {fetchCurrentAuthUser, generateAccessTokenAction} from "../store/actions/authActions";
import {ActionTypes} from "../store/actionTypes";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import Footer from "../components/Footer";
import {syncTasksData} from "../store/actions/taskActions";


const Main = () => {

    const {auth} = useSelector((state: RootState)=>state.authState)
    const dispatch = useDispatch<AppDispatch>()
    const firebaseAuth = getAuth()

    useEffect(() => {

        dispatch(fetchCurrentAuthUser())

        let unSubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
            if (user && user?.email) {
                let [result, error] = await generateAccessTokenAction({
                    username: user.displayName || "",
                    email: user.email,
                    password: "",
                    avatar: user.photoURL || ""
                })

                if (!error) {
                    dispatch({
                        type: ActionTypes.LOGIN,
                        payload: result
                    })
                }
            }
        })

        return () => unSubscribe()

    }, [])



    // sync all local tasks data when user loggged
    useEffect(()=>{
        if(auth){
            dispatch(syncTasksData())
        }
    }, [auth])



    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-1">
                <Navigation/>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}

export default Main