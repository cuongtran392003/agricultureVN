import { Card } from "@/components/ui/card";
import { Colors } from "@/constant/Colors";
import { Text, View } from "react-native";

type UpcomingTaskProps = {
    title: string;
    subTitle: string;
    time: string;
}

export const UpcomingTask = ({ title, subTitle, time }: UpcomingTaskProps) => {
  return (
    <Card className="mt-5">
      <View className="w-full flex-row items-center justify-around">
        <View
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: Colors.brandorange }}
        ></View>
        <View>
          <Text className="font-bold text-[14px]">
            {title}
          </Text>
          <Text className="text-[12px]" style={{ color: Colors.brownearth }}>
            {subTitle}
          </Text>
        </View>
        <Text className="text-[14px]" style={{ color: Colors.brownearth }}>
          {time}
        </Text>
      </View>
    </Card>
  );
};
