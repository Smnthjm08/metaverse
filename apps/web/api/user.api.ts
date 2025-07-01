import API from "../configs/axios.config";

export const getUser = async () => {
  const response = await API.get("/user");
  console.log("getUser response:", response);
  return response;
};
