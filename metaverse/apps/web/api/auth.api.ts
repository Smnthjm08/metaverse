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
    console.log("res", response);
    return response;
  } catch (error: any) {
    // @ts-ignore
    throw error;
  }
};
