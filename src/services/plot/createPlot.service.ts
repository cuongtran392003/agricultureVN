import axiosInstance from "@/libs/axiosInstance"
import { CreatePlotDto } from "@/types/plot"




export const createPlotService = async (data: CreatePlotDto) => {
    const plot = await axiosInstance.post('plot', data)
    return plot.data
}