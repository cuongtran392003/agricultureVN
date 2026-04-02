import axiosInstance from "@/libs/axiosInstance";

export type RegisterDto = {
  name: string;
  email: string;
  password: string;
};

export const registerService = async (data: RegisterDto) => {
  try {
    const res = await axiosInstance.post("/auth/register", data);
    return res;
  } catch (error: any) {    
    console.log(">> check error", error.response.data.message);
    throw error;
  }
};
