import API from "../configs/axios.config";

export const getSessions = async () => {
    const response = await API.get("/session");
    return response;
}

export const deleteSession = async (sessionId: number) => {
    const response = await API.delete(`/session/${sessionId}`);
    return response;
}