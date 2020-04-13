import axios from "axios";
import { getToken } from "./auth";

const http = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 10000,
  headers: { "X-Requested-With": "XMLHttpRequest" }
});

http.defaults.headers.common.Authorization = `Bearer ${getToken()}`;
export default http;
