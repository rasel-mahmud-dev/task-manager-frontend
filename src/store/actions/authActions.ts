import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    updateProfile,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";



// user login action
export function loginAction(auth: any, userData: { email: string, password: string }) {
    return new Promise(async (resolve, reject) => {
        try {
            localStorage.removeItem("token")
            let userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
            if (userCredential.user) {
                resolve(true);
            } else {
                reject("Please try again");
            }
        } catch (ex) {

        }
    });
}
