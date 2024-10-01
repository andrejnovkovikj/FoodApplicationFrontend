import axios from "axios";

const instance = axios.create({

    baseURL : "https://food-application-f4xc.onrender.com",
    headers : {
        'Access-Control-Allow-Origin' : '*',
    }
})
export default instance;