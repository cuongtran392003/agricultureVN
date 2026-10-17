import axiosInstance from "@/libs/axiosInstance";

export type RegisterDto = {
  name: string;
  email: string;
  password: string;
};

export const registerService = async (data: RegisterDto) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res;
};
