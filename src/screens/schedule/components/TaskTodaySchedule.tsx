import { ICONS } from "assets/icons";
import { Colors } from "@/constant/Colors";
import { Image, Text, TouchableOpacity, View } from "react-native";

type TaskTodayScheduleProps = {
  title: string;
  subtitle: string;
  time: string;
  location: string;
  status: string;
  onMarkDone: () => void;
};

export const TaskTodaySchedule = ({
  title,
  subtitle,
  time,
  location,
  status,
  onMarkDone,
}: TaskTodayScheduleProps) => {
  return (
    <View
      className="w-full mt-5 bg-white "
      style={{
        borderLeftWidth: 10,
        ...(status === "upcoming"
          ? {
              borderLeftColor: Colors.sunlightyellow,
            }
          : {
              borderLeftColor: Colors.forestgreen,
            }),
        borderRadius: 16,
      }}
    >
      <View className=" flex-row justify-around gap-2 items-center p-[16px]">
        <View className="w-[56px] h-[56px] p-[8px] rounded-[12px] bg-[#EDE6DE]">
          <Image
            source={ICONS.iconAvatar}
            className="rounded-[12px]"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View className="gap-2 w-[177px]">
          <Text className="font-bold text-[18px]">{title}</Text>
          <Text className="text-[12px]" style={{ color: Colors.brownearth }}>
            {subtitle}
          </Text>
          <View className="flex-row items-center gap-5">
            <Text className="text-[12px]" style={{ color: Colors.lightgray }}>
              {time}
            </Text>
            <Text className="text-[12px]" style={{ color: Colors.lightgray }}>
              {location}
            </Text>
          </View>
        </View>
        {status === "upcoming" ? (
          <View className="bg-[#FEF3C7] p-[8px] rounded-[12px]">
            <Text style={{ color: Colors.brandorange }}>Sắp tới</Text>
          </View>
        ) : (
          <View className="bg-[#E1EDE6] rounded-full p-[8px]">
            <Image source={ICONS.iconTickWhite} />
          </View>
        )}
      </View>
      <View className="bg-[#F9FAFB] p-[16px] rounded-[12px]">
        {status === "upcoming" ? (
          <TouchableOpacity
            className="px-[16px] py-[8px] rounded-[12px] bg-[#F2F7F4] 
        items-center justify-center w-[155px] self-end"
            onPress={onMarkDone}
          >
            <Text className="font-bold">Đánh dấu xong</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
