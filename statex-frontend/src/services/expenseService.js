import axios from "axios";

const API = "http://localhost:8080/api/expenses";

const getToken = () => {
  return localStorage.getItem("token");
};

export const getAllExpenses = async () => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const addExpense = async (expense) => {
  return axios.post(API, expense, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const updateExpense = async (id, expense) => {
  return axios.put(`${API}/${id}`, expense, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};

export const deleteExpense = async (id) => {
  return axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
};