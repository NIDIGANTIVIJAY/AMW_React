import axios from 'axios';
import{store,persistor} from "../../../store/index"

const url = process.env.REACT_APP_SERVICE_ID;

const getTokenFromRedux = () => {
    const state = store.getState();
    return state.Login.token; // Replace 'auth' with your actual reducer name
  };

// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: url, // Set your API base URL
});

// Add an interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
       let token=getTokenFromRedux()
       console.log(token)
    // Add your token to the request headers
    // const token = 'YOUR_ACCESS_TOKEN_HERE'; // Replace with your actual token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Export the configured Axios instance
export default axiosInstance;
