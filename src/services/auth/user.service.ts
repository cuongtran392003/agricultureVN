import axiosInstance from "@/libs/axiosInstance";

class UserService {
  async updateUser(id: string, data: any) {
    try {
      const res = await axiosInstance.patch(`/users/${id}`, data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const userService = new UserService();
