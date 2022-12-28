import {
    signInWithPopup,
    GoogleAuthProvider,
    getAuth
} from "firebase/auth";


import {firebaseApp} from "../../firebase";
import api from "../../api";
import {Dispatch} from "redux";
import {ActionTypes, LoginAction} from "../actionTypes";
import {Auth} from "../reducers/authReducer";


// user login action
export function loginAction(userData: { email: string, password: string }, cb: (error?: string) => void) {
    return async function (dispatch: Dispatch<LoginAction>) {
        try {
            localStorage.removeItem("token")
            let {status, data} = await api().post("/api/v1/auth/login", userData);
            if (status === 201 && data.token) {
                localStorage.setItem("token", data.token)
                dispatch({
                    type: ActionTypes.LOGIN,
                    payload: data.user
                })
                cb()
            } else {
                cb(data.message)
            }

        } catch (ex: any) {
            cb(ex.message)
        }
    }
}


export function googleSignInAction() {
    return new Promise(async (resolve, reject) => {
        const auth = getAuth(firebaseApp)
        try {
            const provider = new GoogleAuthProvider();
            let result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (user) {
                resolve(user);
            } else {
                reject("Google login fail")
            }

        } catch (ex) {
            reject(ex);
        }
    });
}


// user registration process
export function registrationAction(userData: { username: string, avatar: string, email: string, password: string }, cb: (err?: string) => void) {
    return async function (dispatch: Dispatch<LoginAction>) {


        try {
            // first remove token from localstorage
            localStorage.removeItem("token")


            let {status, data} = await api().post("/api/v1/auth/registration", userData);
            if (status === 201 && data.token) {
                localStorage.setItem("token", data.token)
                dispatch({
                    type: ActionTypes.LOGIN,
                    payload: data.user
                })
                cb && cb()
                return
            } else {
                cb && cb(data.message)
            }
        } catch (ex: any) {
            console.log(ex)
            cb && cb(ex.message)
        }
    }
}


export function validateToken() {
    return new Promise(async (resolve) => {
        try {
            let {status, data} = await api().get("/api/v1/auth/validate-token");
            if (status === 200) {
                resolve([data.user, undefined]);
            } else {
                resolve([undefined, data.message]);
            }
        } catch (ex: any) {
            resolve([undefined, ex.message]);
        }
    });
}

export function generateAccessTokenAction(payload: { username: string, avatar: string, email: string, password: string, isEntry?: boolean }) {
    return new Promise<[Auth | undefined, string | undefined]>(async (resolve, reject) => {
        try {
            let {status, data} = await api().post("/api/v1/auth/generate-token", payload);
            if (status === 201 && data.token) {
                localStorage.setItem("token", data.token)
                resolve([data.user, undefined]);
            } else {
                resolve([undefined, data.message]);
            }
        } catch (ex: any) {
            resolve([undefined, ex.message]);
        }
    });
}

