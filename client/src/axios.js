import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/",
  withCredentials: true,
});
makeRequest.interceptors.response.use(function(response) {
  return response;
})
