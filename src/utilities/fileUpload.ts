import axios from "axios";

function fileUpload(file: Blob) {
    return new Promise<[{url: string}|undefined, string|undefined]>(async (resolve, _) => {
        try {

            const formData = new FormData()
            formData.append("image", file)
            formData.append("key", import.meta.env.VITE_APP_IMGBB_API)

            formData.append("name", file.name)
            let {data, status} = await axios.post("https://api.imgbb.com/1/upload", formData, {
                headers: {
                    "content-type": "multipart/formdata",
                }
            })

            if (status === 200 && data && data.data && data.data) {
                resolve([data.data, undefined])
            } else {
                resolve([undefined, "file upload fail"])
            }


        } catch (ex : any) {
            resolve([undefined, ex.message])
        }


    })
}

export default fileUpload