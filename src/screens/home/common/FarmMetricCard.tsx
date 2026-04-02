import { Colors } from "@/constant/Colors";
import { FarmMetricCardProps } from "@/types/home";
import { Image, Text, View } from "react-native";

export const FarmMetricCard = ({ name, value, icons }: FarmMetricCardProps) => {
  return (
    <View
      className="bg-white rounded-[24px] items-center justify-center p-[20px]"
      style={{
        flex: 1,
        marginHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      <View
        className="w-[40px] h-[40px] rounded-full items-center justify-center"
        style={{ backgroundColor: Colors.leafgreen }}
      >
        <Image source={icons} />
      </View>
      <Text
        className="text-[12px] font-bold mt-2"
        style={{ color: Colors.brownearth }}
      >
        {name}
      </Text>
      <Text
        className="text-[20px] font-bold"
        style={{ color: Colors.brownearth }}
      >
        {value}
      </Text>
    </View>
  );
};
