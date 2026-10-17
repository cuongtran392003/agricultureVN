import axiosInstance from "@/libs/axiosInstance";

class UserService {
  async updateUser(id: string, data: any) {
    const res = await axiosInstance.patch(`/users/${id}`, data);
    return res.data;
  }
}

export const userService = new UserService();
