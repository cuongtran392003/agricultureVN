import axiosInstance from "@/libs/axiosInstance"
import { CreateFarmDto } from "@/types/farm"


export const createFarmService = async (data:CreateFarmDto) => {
    const res = await axiosInstance.post('/farm', data)
    return res.data
}