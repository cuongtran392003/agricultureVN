import { Card } from "@/components/ui/card";
import { Colors } from "@/constant/Colors";
import { formatTime } from "@/utils/formatTimeDate";
import { Text, TouchableOpacity, View } from "react-native";

type UpcomingTaskProps = {
    title: string;
    subTitle: string;
    time: string;
    onPress:() => void;
}

export const UpcomingTask = ({ title, subTitle, time, onPress }: UpcomingTaskProps) => {
  return (
    <TouchableOpacity
    onPress={onPress}
      className="w-full mt-3 rounded-[16px] p-4 bg-[#F8F9FA] flex-row items-center justify-between"
      style={{
        borderWidth: 1,
        borderColor: "#E5E7EB",
      }}
    >
      <View className="flex-row items-center flex-1">
        <View
          className="w-3 h-3 rounded-full mr-4"
          style={{ backgroundColor: Colors.brandorange, opacity: 0.7 }}
        ></View>
        <View className="flex-1">
          <Text className="font-bold text-[15px] mb-1 text-gray-800" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-[13px]" style={{ color: Colors.brownearth }}>
            {subTitle}
          </Text>
        </View>
      </View>
      <View className="bg-white px-3 py-1.5 rounded-lg border border-gray-200">
        <Text className="font-medium text-[13px]" style={{ color: Colors.brownearth }}>
          {formatTime(new Date(time))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
