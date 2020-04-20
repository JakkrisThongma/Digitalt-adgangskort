import axios from 'axios';


const http = axios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 10000,
    headers: { "X-Requested-With": "XMLHttpRequest" }
  });

export default http;
