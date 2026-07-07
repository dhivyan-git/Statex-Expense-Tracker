import axios from "axios";

const API = "http://localhost:8080/api/expenses";

const token = () => localStorage.getItem("token");

export const getDashboardSummary = () =>
  axios.get(`${API}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });

export const getMonthlyExpense = () =>
  axios.get(`${API}/monthly`, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });

export const getCategorySummary = () =>
  axios.get(`${API}/category-summary`, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });

export const getAllExpenses = () =>
  axios.get(`${API}`, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  });