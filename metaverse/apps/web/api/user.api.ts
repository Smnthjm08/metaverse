import API from "../configs/axios.config";

export const getUser = async () => {
  const response = await API.get("/user");
  return response;
};
