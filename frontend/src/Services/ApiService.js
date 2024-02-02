import axios from "axios"
import { toast } from "react-toastify";



const formheader = {
    Accept: "text/plain",
    Authorization: localStorage.getItem("token")
}

export async function GetApi(path) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(path, {
                headers: {
                    Accept: "application/json",
                    Authorization: localStorage.getItem("token")
                }
            });
            resolve(response);
        } catch (error) {
            reject(error.response || error);
        }
    });
}

export function PostApi(path, body) {
    console.log(localStorage.getItem("token"));
    const PostApiData = axios
        .post(path, body, {
            headers: {
                Accept: "application/json",
                Authorization: localStorage.getItem("token")
            }
        })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            return error.response;
        });
    return PostApiData;
}

export function PostApiFormdata(path, body) {
    const PostApiData = axios
        .post(path, body, { headers: formheader })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            return error.response;
        });
    return PostApiData;
}