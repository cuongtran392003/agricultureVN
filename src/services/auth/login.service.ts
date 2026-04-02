import axiosInstance from "@/libs/axiosInstance"
import { LoginDto } from "@/types/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"


export const loginService = async (data: LoginDto) => {
    try {
        const res = await axiosInstance.post('/auth/login', data)
        return res
    } catch (error: any) {
        throw error
    }
}