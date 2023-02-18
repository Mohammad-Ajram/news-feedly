import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;



export const getNewsApiCall = async(params={}) => {
    return await axios.get("/news",params);
}

