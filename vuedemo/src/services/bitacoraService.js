import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:5050`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
    // "Content-Type": "application/x-www-form-urlencoded"
    "Content-Type": "application/json"
  }
});

export default {
  getAll() {
    return apiClient.get("/bitacora");
  }
  //   get(id) {
  //     return apiClient.get("/users/" + id);
  //   },
  //   post(user) {
  //     return apiClient.post("/users", user);
  //   }
};
