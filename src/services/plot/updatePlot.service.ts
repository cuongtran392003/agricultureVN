import axiosInstance from "@/libs/axiosInstance";
import { UpdatePlot } from "@/types/plot";


export const updatePlotService = async (id:string, data: UpdatePlot) => {
    const res = await axiosInstance.patch(`/plot/${id}`,data)
    return res.data
}