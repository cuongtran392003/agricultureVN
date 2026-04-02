import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export const RegisterHeader = () => {
    const router = useRouter()
  return (
    <View className="flex-row items-center justify-between w-full">
      <TouchableOpacity onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <View className="w-full">
        <Text className="font-bold text-[18px] text-center">Đăng ký tài khoản</Text>
      </View>
    </View> 
  );
};
