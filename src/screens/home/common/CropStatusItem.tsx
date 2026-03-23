import { ICONS } from "@/assets/icons";
import { Colors } from "@/constant/Colors";
import { CropStatusItemProps } from "@/types/home";
import { Image, Text, View } from "react-native";



export const CropStatusItem = ({ name, status, icon }: CropStatusItemProps) => {
  return (
    <View
      className="w-full flex-row items-center justify-between gap-2 rounded-[16px] px-[12px] py-[8px]"
      style={{ backgroundColor: Colors.leafgreen }}
    >
      <View className="flex-row gap-5">
        <Image source={icon} />
        <Text className="text-white font-bold">{name}</Text>
      </View>
      <Text className="text-white font-bold">{status}</Text>
    </View>
  );
};
