import axiosInstance from "@/libs/axiosInstance"
import { CreateFarmDto, UpdateFarmDto } from "@/types/farm"


export const updateFarmService = async (id: string, data: UpdateFarmDto) => {
    const res = await axiosInstance.patch(`/farm/${id}`, data)
    return res.data
}