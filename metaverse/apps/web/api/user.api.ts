import API from "../configs/axios.config";

export const getUser = async () => {
  const response = API.get("/user");
  return response;
};
