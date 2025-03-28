import axios from "axios";
import config from "./config";


const mainApi = axios.create({
    baseURL: config.MAIN_API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
});

mainApi.interceptors.request.use((config) => {
  console.log('Main API Request:', config);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default mainApi; 


// const api = ({dispatch}) => (next) => async(action) => {
//     if(action.type !== actions.apiCallBegun.type)return next(action);

//     const {url,method,data,token,onStart,onSuccess,onError} = action.payload;

//     const isSummarizeApi = url.startsWith("summarize");

//     const baseURL = isSummarizeApi ? "http://localhost:8000/":"http://localhost:8080/"; 
//     if(onStart)dispatch({type: onStart,payload:data});

//     next(action);

//     try {
//         console.log(action.payload);
//         const response =  await axios.request({
//             baseURL: baseURL,
//             url,
//             method,
//             data,
//             headers: {
//                 ...(token ? { Authorization: `Bearer ${token}` } : {}),
//             }
//         });
//         dispatch(actions.apiCallSeccess(response.data))
//         if(onSuccess)dispatch({type: onSuccess,payload: response.data});
//     } catch (error) {
//         const errorPayload = {
//             message: error.message,
//             status: error.response?.status,
//             data: error.response?.data
//         };
//         dispatch(actions.apiCallFailed(errorPayload));
//         if(onError){
//             dispatch({type: onError, payload: errorPayload})
//         }
//     }
// }