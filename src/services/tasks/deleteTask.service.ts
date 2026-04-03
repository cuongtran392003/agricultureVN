import axiosInstance from "@/libs/axiosInstance";

export const deleteTask = async (id: string) => {
  const res = await axiosInstance.delete(`/tasks/${id}`);
  return res.data;
};