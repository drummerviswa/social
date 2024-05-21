import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://social-5r67.onrender.com/api/",
  withCredentials: true,
  headers:{
    Authorization:"Bearer secretkey"
  }
});
makeRequest.interceptors.response.use(function(response) {
  return response;
})
