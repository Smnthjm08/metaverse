import API from "../configs/axios.config";

export const getSessions = async () => {
    const response = await API.get("/session");
    return response;
}