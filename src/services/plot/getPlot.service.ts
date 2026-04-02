import axiosInstance from "@/libs/axiosInstance"


export const getPlot = async () => {
    const res = await axiosInstance.get("/plot")
    return res.data
}