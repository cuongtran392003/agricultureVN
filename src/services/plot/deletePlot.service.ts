import axiosInstance from "@/libs/axiosInstance"


export const deletePlotService = async (id: string) => {
    const res = await axiosInstance.delete(`/plot/${id}`)
    return res.data
}