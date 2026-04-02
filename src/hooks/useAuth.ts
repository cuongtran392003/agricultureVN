import { loginService } from "@/services/auth/login.service";
import { RegisterDto, registerService } from "@/services/auth/register.service";
import { useAuthStore } from "@/stores/authStore";
import { LoginDto } from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export const useLogin = () => {
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: async (data: LoginDto) => await loginService(data),
    onSuccess: async (res: any) => {
      console.log(">> check res", res.data.data);
      setUser(res.data.data.user);
      await AsyncStorage.setItem(
        "accessToken",
        res.data.data.token.accessToken,
      );
      await AsyncStorage.setItem(
        "refreshToken",
        res.data.data.token.refreshToken,
      );
      await AsyncStorage.setItem("user", JSON.stringify(res.data.data.user));
    },
    onError: (error: any) => {
      console.log(">> check error", error.response.data.message);
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: RegisterDto) => await registerService(data),
    onSuccess: async (res: any) => {
      Alert.alert("Thông báo", "Đăng ký thành công", [
        {
          text: "OK",
          onPress: () => {
            router.push("/login");
          },
        },
      ]);
    },
    onError: (error: any) => {
      if (error.response?.status === 409) {
        Alert.alert("Email đã tồn tại");
        return;
      }

      Alert.alert(
        "Thông báo",
        error.response?.data?.message || "Có lỗi xảy ra",
      );
    },
  });
};
