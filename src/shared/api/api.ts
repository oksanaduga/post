import axios from "axios";

//TODO
export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  // headers: {
  //   "Content-Type": "application/json",
  // },
});
