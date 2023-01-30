import Axios from "axios";

export default Axios.create({
  baseURL:      "https://lozzby.herokuapp.com" ,//"http://localhost:8090",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhQGdhbWFpbC5jb20iLCJpYXQiOjE2NjU3NjIxMTMsImV4cCI6MzMzMTg4NDIyNiwiaXNzIjoiRVJQIn0.Dg-Fyrn6POmUJpBD8tyxywXVpYldkvx_mGyxrM54EUo",
  }
});

function returnAxiosInstance() {
  return Axios.create();
}

export function post(url: string, requestData: any) {
  const axios = returnAxiosInstance();
  return axios.post(url, requestData);
}

export function get(url: string ,headers?:any) {
  const axios = returnAxiosInstance();
  return axios.post(url, headers);
}

export function put(url: string, requestData: any) {
  const axios = returnAxiosInstance();
  return axios.put(url, requestData);
}

export function delete_(url: string) {
  const axios = returnAxiosInstance();
  return axios.delete(url);
}
