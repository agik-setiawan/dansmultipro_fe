import axios from 'axios';
import { environment } from '../environments/environment';



// axios.defaults.baseURL = environment.api_url;

axios.interceptors.request.use((request: any) => {
    return request;
});

const http = axios;

export default http;