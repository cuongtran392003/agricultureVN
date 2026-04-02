import axiosInstance from "@/libs/axiosInstance"
import { CreateTaskDto } from "@/types/tasks"




export const createTask = async(data:CreateTaskDto) => {
    const res = await axiosInstance.post('/tasks',data)
    return res.data
}