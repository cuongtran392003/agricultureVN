import { ICONS } from "assets/icons";
import { Colors } from "@/constant/Colors";
import { Image, Text, View } from "react-native";

type HomeHeaderProps = {
  data: any; // Replace 'any' with the actual type if available
};

export const HomeHeader = (props: HomeHeaderProps) => {
  return (
    <View
      className="flex-row items-center justify-between px-[24px] py-[16px] rounded-b-[20px]"
      style={{ backgroundColor: Colors.offwhite }}
    >
      <View>
        <Text
          className="text-[24px] font-bold"
          style={{ color: Colors.forestgreen }}
        >
          Vườn của tôi
        </Text>
        <Text
          className="text-[14px] font-semibold"
          style={{ color: Colors.brownearth }}
        >
          {props.data?.name || "Cao nguyên Đăk Lăk"}
        </Text>
      </View>
      <View className="w-[48px] h-[48px] rounded-full bg-gray-300">
        <Image source={ICONS.iconAvatar} className="w-full h-full rounded-full" />
      </View>
    </View>
  );
};
