import { Colors } from "@/constant/Colors";
import { FarmMetricCardProps } from "@/types/home";
import { Image, Text, View } from "react-native";



export const FarmMetricCard = ({ name, value, icons }: FarmMetricCardProps) => {
  return (
    <View className="bg-white rounded-[24px] items-center justify-center w-[167px] h-[134px] p-[20px]">
      <View
        className="w-[40px] h-[40px] rounded-full items-center justify-center"
        style={{ backgroundColor: Colors.leafgreen }}
      >
        <Image source={icons} />
      </View>
      <Text className="text-[12px] font-bold mt-2" style={{color: Colors.brownearth}}>{name}</Text>
      <Text className="text-[20px] font-bold" style={{color: Colors.brownearth}}>{value}</Text>
    </View>
  );
};
