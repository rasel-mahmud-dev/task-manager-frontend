import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    updateProfile,
    sendPasswordResetEmail,
    signOut,
    getAuth
} from "firebase/auth";
import {firebaseApp} from "../../firebase";



// user login action
export function loginAction(userData: { email: string, password: string }) {
    return new Promise(async (resolve, reject) => {

        let auth1 = getAuth()

        try {
            localStorage.removeItem("token")
            let userCredential = await signInWithEmailAndPassword(auth1, userData.email, userData.password);
            if (userCredential.user) {
                resolve(true);
            } else {
                reject("Please try again");
            }
        } catch (ex: unknown) {
            let message = ""
            if(ex.message) {
                if (ex.message.includes("user-not-found")) {
                    message = "User not Registered yet"
                }
            } else {
                message  = "Internal Error, Please try again"
            }
            reject(message)
        }
    });
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
            }else{
                reject("Google login fail")
            }

        } catch (ex) {
            reject(ex);
        }
    });
}
