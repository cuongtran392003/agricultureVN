import { Colors } from "@/constant/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export const ChatHeader = () => {
  const router = useRouter();
  return (
    <View
      className="w-full flex-row items-center justify-between px-[16px] py-[14px]"
      style={{
        backgroundColor: Colors.offwhite,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightgray,
      }}
    >
      <View className="flex-row items-center gap-3 flex-1">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-1"
        >
          <FontAwesome
            name="chevron-left"
            size={20}
            color={Colors.forestgreen}
          />
        </TouchableOpacity>
        <Text
          className="font-bold text-[18px]"
          style={{ color: Colors.forestgreen }}
        >
          Hỏi đáp chuyên gia AI
        </Text>
      </View>
      <TouchableOpacity className="p-1">
        <Ionicons
          name="ellipsis-vertical"
          size={22}
          color={Colors.mediumtaupe}
        />
      </TouchableOpacity>
    </View>
  );
};
