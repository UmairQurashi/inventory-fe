import axios from "axios";

const api = axios.create({
  // baseURL: "https://inventorysysbe.herokuapp.com/api/v1",
  baseURL: "http://127.0.0.1:5000/api/v1",
});

export default api;
