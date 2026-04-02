import { Colors } from "@/constant/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export const SettingHeader = () => {
  const router = useRouter();
  return (
    <View
      className="w-full flex-row items-center px-[24px] py-[16px] rounded-b-[20px]"
      style={{ backgroundColor: Colors.offwhite }}
    >
      <TouchableOpacity onPress={() => router.navigate("/(tabs)/home" as any)}>
        <FontAwesome name="chevron-left" size={24} color={Colors.forestgreen} />
      </TouchableOpacity>
      <View className="flex-1">
        <Text
          className="text-[20px] font-bold text-center"
          style={{ color: Colors.forestgreen }}
        >
          Cài đặt tài khoản
        </Text>
      </View>
    </View>
  );
};
