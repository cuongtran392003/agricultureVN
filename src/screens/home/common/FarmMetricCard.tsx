import { Colors } from "@/constant/Colors";
import { FarmMetricCardProps } from "@/types/home";
import { Image, View } from "react-native";
import { LocalizedText as Text } from "@/components/common/LocalizedText";

export const FarmMetricCard = ({ name, value, icons }: FarmMetricCardProps) => {
  return (
    <View
      className="rounded-[22px] items-center justify-center p-[18px]"
      style={{
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
      }}
    >
      <View
        className="w-[40px] h-[40px] rounded-full items-center justify-center"
        style={{ backgroundColor: Colors.surfaceMuted }}
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
