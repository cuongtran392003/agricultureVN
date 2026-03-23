import { Colors } from "@/constant/Colors";
import { Text, TouchableOpacity, View } from "react-native";

type WeekDayItemsProps = {
  day: number;
  date: number;
  isSelected: boolean;
  hasEvent: boolean;
  onPress: () => void;
};

export const WeekDayItems = ({
  day,
  date,
  isSelected,
  hasEvent,
  onPress,
}: WeekDayItemsProps) => {
  const DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  return (
    <TouchableOpacity onPress={onPress} className="items-center gap-1">
      <Text
        className="text-[12px] font-semibold"
        style={{ color: Colors.brownearth }}
      >
        {DAYS[day]}
      </Text>
      <View>
        <Text
          className="text-[14px] font-semibold"
          style={{ color: isSelected ? Colors.lightgray : Colors.brownearth }}
        >
          {date}
        </Text>
      </View>
      <View
        className="w-[4px] h-[4px] rounded-full"
        style={{
          backgroundColor: hasEvent ? Colors.brandorange : Colors.forestgreen,
        }}
      ></View>
    </TouchableOpacity>
  );
};
