import { Colors } from "@/constant/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { ICONS } from "assets/icons";
import { Image, Text, View } from "react-native";

type Props = {
  id?: string;
  name?: string;
}
export const ProfileHeader = ({id,name}:Props) => {
  return (
    <View className="items-center justify-center gap-2 mt-4 mb-4">
      {/* Avatar with camera icon */}
      <View className="relative">
        <View
          className="w-[112px] h-[112px] rounded-full"
          style={{ borderWidth: 2, borderColor: Colors.forestgreen }}
        >
          <Image
            source={ICONS.iconAvatar}
            className="w-full h-full rounded-full"
          />
        </View>
        {/* Camera icon overlay */}
        <View
          className="absolute bottom-0 right-0 w-[32px] h-[32px] rounded-full items-center justify-center"
          style={{
            backgroundColor: Colors.offwhite,
            borderWidth: 1.5,
            borderColor: Colors.forestgreen,
          }}
        >
          <FontAwesome name="camera" size={14} color={Colors.forestgreen} />
        </View>
      </View>

      {/* Name */}
      <Text className="font-bold text-[20px] text-center">
        {name}
      </Text>

      {/* Crop type subtitle */}
      <Text
        className="font-semibold text-[13px] text-center"
        style={{ color: Colors.leafgreen }}
      >
        🌾 Lúa ngọc & Cây ăn trái
      </Text>

      {/* User ID */}
      <Text
        className="font-semibold text-[12px] text-center"
        style={{ color: Colors.softsoil }}
      >
        ID: {id}
      </Text>
    </View>
  );
};
