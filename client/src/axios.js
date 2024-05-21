import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://social-backend-ncloy6ruy-drummerviswas-projects.vercel.app/api/",
  withCredentials: true,
});
makeRequest.interceptors.response.use(function(response) {
  return response;
})
