import axiosInstance from "@/libs/axiosInstance";
import { UpdateTaskDto } from "@/types/tasks";


export const updateTask = async(id: string, data: UpdateTaskDto) => {
    const res = await axiosInstance.patch(`/tasks/${id}`, data);
    return res.data;
}