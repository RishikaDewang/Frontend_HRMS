// Import the 'axios' library for making HTTP requests and the 'BASE_URL' constant from another file.
import axios from "axios";
import { BASE_URL } from "./apiconstant";
// import { useSelector } from "react-redux";

// Define and export a function called 'Api' that takes several parameters: 'path', 'method', 'data', and 'headers'.

export default function Api(path, method, data, headers={}) {
    // Construct an axios request with the provided 'path', 'method', 'data', and 'headers'.
    const storedToken = localStorage.getItem('token');
    const token = JSON.parse(storedToken || 'null')
    axios.interceptors.request.use(async config => {
        const timeZoneId = await getTimeZoneId();
        config.headers['TimeZoneId'] = timeZoneId;
        return config;
    });
    
    async function getTimeZoneId() {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log("timeZone",timeZone)
        return timeZone;
    }
    
    return axios({
        url: path,               // The URL to which the request will be sent.
        method: method,          // The HTTP method (e.g., GET, POST) of the request.
        baseURL: BASE_URL,       // The base URL used as a prefix for the 'path'.
        // params: params, 
        data: data,              // The data to be sent in the request body.
        headers: {
            ...headers,
            'Authorization': `Bearer ${token}`
          },                                        // The headers to be included in the request.
    })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("Response data:", error.response.data);
            console.log("Response status:", error.response.status);
            console.log("Response headers:", error.response.headers);
            throw error
        })
}