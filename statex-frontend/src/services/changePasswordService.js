import axios from "axios";

const API_URL = "http://localhost:8080/api/profile";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const changePassword = (data) => {
  return axios.put(
    `${API_URL}/change-password`,
    data,
    getAuthHeader()
  );
};