import axiosInstance from "@/libs/axiosInstance"


export const getTaskById =async (id: string) => {
    const res = await axiosInstance.get(`/tasks/${id}`)
    return res.data
}