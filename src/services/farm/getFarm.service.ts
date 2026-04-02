import axiosInstance from "@/libs/axiosInstance"


export const getFarm  = async() => {
    const res = await axiosInstance('/farm')
    return res.data
}