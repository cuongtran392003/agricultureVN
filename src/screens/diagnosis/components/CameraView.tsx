import { Colors } from "@/constant/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export const CameraView = () => {
  return (
    <View className="items-center px-[20px] mt-4">
      {/* Instruction text */}
      <View
        className="w-full rounded-[10px] py-[10px] px-[16px] mb-4"
        style={{ backgroundColor: "#E8F5E9" }}
      >
        <Text
          className="text-center text-[13px] font-medium"
          style={{ color: Colors.forestgreen }}
        >
          📷 Hướng camera về phía lá bệnh
        </Text>
      </View>

      {/* Camera preview area */}
      <View
        className="w-full rounded-[16px] items-center justify-center overflow-hidden"
        style={{
          aspectRatio: 4 / 3,
          backgroundColor: "#1a1a1a",
          borderWidth: 3,
          borderColor: Colors.forestgreen,
        }}
      >
        {/* Corner brackets */}
        <View className="absolute top-3 left-3 w-[30px] h-[30px] border-t-[3px] border-l-[3px] rounded-tl-[4px]" style={{ borderColor: Colors.sunlightyellow }} />
        <View className="absolute top-3 right-3 w-[30px] h-[30px] border-t-[3px] border-r-[3px] rounded-tr-[4px]" style={{ borderColor: Colors.sunlightyellow }} />
        <View className="absolute bottom-3 left-3 w-[30px] h-[30px] border-b-[3px] border-l-[3px] rounded-bl-[4px]" style={{ borderColor: Colors.sunlightyellow }} />
        <View className="absolute bottom-3 right-3 w-[30px] h-[30px] border-b-[3px] border-r-[3px] rounded-br-[4px]" style={{ borderColor: Colors.sunlightyellow }} />

        {/* Live view placeholder */}
        <View className="items-center gap-2">
          <Ionicons name="scan-outline" size={48} color="rgba(255,255,255,0.3)" />
          <Text className="text-white font-bold text-[18px] tracking-[4px]">
            LIVE VIEW
          </Text>
          <Text className="text-[11px] text-center px-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            Đang phân tích hình ảnh, cảm biến đang hoạt động
          </Text>
        </View>
      </View>

      {/* Action buttons */}
      <View className="flex-row items-center justify-center gap-10 mt-5 mb-2">
        {/* Gallery button */}
        <TouchableOpacity className="items-center gap-1">
          <View
            className="w-[48px] h-[48px] rounded-full items-center justify-center"
            style={{ backgroundColor: "#E8F5E9" }}
          >
            <Ionicons name="images-outline" size={22} color={Colors.forestgreen} />
          </View>
          <Text className="text-[11px] font-semibold" style={{ color: Colors.forestgreen }}>
            THƯ VIỆN
          </Text>
        </TouchableOpacity>

        {/* Capture button */}
        <TouchableOpacity className="items-center">
          <View
            className="w-[68px] h-[68px] rounded-full items-center justify-center"
            style={{
              backgroundColor: Colors.forestgreen,
              shadowColor: Colors.forestgreen,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.4,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <FontAwesome name="camera" size={28} color={Colors.offwhite} />
          </View>
        </TouchableOpacity>

        {/* Flash button */}
        <TouchableOpacity className="items-center gap-1">
          <View
            className="w-[48px] h-[48px] rounded-full items-center justify-center"
            style={{ backgroundColor: "#E8F5E9" }}
          >
            <Ionicons name="flash-outline" size={22} color={Colors.forestgreen} />
          </View>
          <Text className="text-[11px] font-semibold" style={{ color: Colors.forestgreen }}>
            ĐÈN FLASH
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
