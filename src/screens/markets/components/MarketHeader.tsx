import { Card } from "@/components/ui/card";
import { ICONS } from "assets/icons";
import { Image, Text, View } from "react-native";

export const MarketHeader = () => {
  return (
    <View className="w-full bg-white flex-row items-center justify-between px-4 py-2">
      <Card className="w-[40px] h-[40px] ">
        <Image source={ICONS.iconMarket} />
      </Card>
      <Text className="text-[20px] font-bold">Tin Tức Thị Trường</Text>
      <Image source={ICONS.iconBellBlack} />
    </View>
  );
};
