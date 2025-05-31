import API from "../configs/axios.config";


export const signInRequest = async (data: any): Promise<any> => {
  try {
    const response = await API.post("/auth/signin", data);
    return response;
  } catch (error: any) {
    // @ts-ignore
    throw error;
  }
};

export const signUpRequest = async (data: any): Promise<any> => {
  try {
    const response = await API.post("/auth/signup", data);
    return response;
  } catch (error: any) {
    // @ts-ignore
    throw error;
  }
};

export const logoutRequest = async (): Promise<any> => {
  try {
    const response = await API.get("/auth/logout");
    console.log("Logout response:", response);
  } catch (error: any) {
    // @ts-ignore
    throw error;
  }
}
