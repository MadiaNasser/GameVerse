import axios from "axios";

const api = axios.create({
  baseURL: "https://gameverse-fqrw.onrender.com",
});

export default api;