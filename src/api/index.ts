import axios from "axios"
const backend = "http://localhost:1000"

const instance = axios.create({
    baseURL: backend,
    headers: {
        token: localStorage.getItem("token")
    }
})

instance.interceptors.response.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error

    let message = error.message;

     if(error.response?.data){
         if(error.response.data.message){
             message = error.response.data.message
         } else if(typeof error.response.data === "string"){
             message = error.response.data
         }
     }
    error.message = message
    return Promise.reject(error);
})

export default ()=> {
    instance.defaults.headers["token"] = localStorage.getItem("token" || "")
    return instance
}
