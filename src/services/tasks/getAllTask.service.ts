import axiosInstance from "@/libs/axiosInstance"


export const getAllTasks = async () => {
    const res = await axiosInstance.get("/tasks")
    return res.data
}