import axios from "axios";

const api = axios.create({
  baseURL: "https://hiretrack-ats-xgr3.onrender.com/api",
});

export default api;