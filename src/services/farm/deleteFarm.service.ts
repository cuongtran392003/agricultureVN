import axiosInstance from "@/libs/axiosInstance"


export const deleteFarm = async (id: string) => {
    const res = await axiosInstance.delete(`/farm/${id}`)
    return res.data
}