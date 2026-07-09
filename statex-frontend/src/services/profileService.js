import api from "./api";

export const getProfile = () => {
  return api.get("/profile");
};

export const updateProfile = (profile) => {
  return api.put("/profile", profile);
};