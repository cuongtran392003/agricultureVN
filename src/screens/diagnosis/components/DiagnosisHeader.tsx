import { Colors } from "@/constant/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export const DiagnosisHeader = () => {
  return (
    <View
      className="w-full flex-row items-center justify-between px-[20px] py-[14px]"
      style={{ backgroundColor: Colors.forestgreen }}
    >
      <View className="flex-row items-center gap-3">
        <View
          className="w-[36px] h-[36px] rounded-[8px] items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        >
          <FontAwesome name="book" size={18} color={Colors.offwhite} />
        </View>
        <Text className="text-white font-bold text-[20px]">
          Bác Sĩ Cây Trồng
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={24} color={Colors.offwhite} />
      </TouchableOpacity>
    </View>
  );
};
