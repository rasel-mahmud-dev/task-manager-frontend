import axios from "axios"
const backend = "http://localhost:1000"

export default ()=> axios.create({
    baseURL: backend,
    headers: {
        token: localStorage.getItem("token")
    }
})

