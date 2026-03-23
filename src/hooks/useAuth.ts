import { loginService } from "@/services/auth/login.service"
import { useAuthStore } from "@/stores/authStore"
import { LoginDto } from "@/types/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useMutation } from "@tanstack/react-query"

export const useLogin = () => {
    const {setUser} = useAuthStore()
    return useMutation({
        mutationFn: async (data: LoginDto) => await loginService(data),
        onSuccess: async (res: any) => {
            console.log('>> check res', res.data.data)
            setUser(res.data.data.user)
            await AsyncStorage.setItem('accessToken', res.data.data.token.accessToken)
            await AsyncStorage.setItem('refreshToken', res.data.data.token.refreshToken)
        }
    })
}