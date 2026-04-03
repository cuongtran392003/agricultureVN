import { Colors } from "@/constant/Colors";
import { formatTime } from "@/utils/formatTimeDate";
import { FontAwesome } from "@expo/vector-icons";
import { ICONS } from "assets/icons";
import * as Haptics from "expo-haptics";
import { Image, Text, TouchableOpacity, View } from "react-native";

type TaskTodayScheduleProps = {
  title: string;
  subtitle: string;
  time: string;
  location: string;
  status: string;
  onMarkDone: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const TaskTodaySchedule = ({
  title,
  subtitle,
  time,
  location,
  status,
  onMarkDone,
  onEdit,
  onDelete,
}: TaskTodayScheduleProps) => {
  return (
    <View
      className="w-full mt-4 bg-white"
      style={{
        borderLeftWidth: 6,
        ...(status === "pending"
          ? {
              borderLeftColor: Colors.brandorange,
            }
          : {
              borderLeftColor: Colors.forestgreen,
            }),
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.03)",
        overflow: "hidden",
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
        <View className="flex-1 ml-3 gap-2">
          <Text className="font-bold text-[18px]" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-[12px]" style={{ color: Colors.brownearth }}>
            {subtitle}
          </Text>
          <View className="flex-row items-center gap-5">
            <Text className="text-[12px]" style={{ color: Colors.brownearth }}>
              {formatTime(new Date(time))}
            </Text>
            <Text className="text-[12px]" style={{ color: Colors.brownearth }}>
              {location}
            </Text>
          </View>
        </View>
        {status === "pending" ? (
          <View className="bg-[#FEF3C7] p-[8px] rounded-[12px]">
            <Text style={{ color: Colors.brandorange }}>Chờ thực hiện</Text>
          </View>
        ) : (
          <View className="bg-[#E1EDE6] rounded-full p-[8px]">
            <Image source={ICONS.iconTickWhite} />
          </View>
        )}
      </View>
      <View className="bg-[#F9FAFB] p-[16px] flex-row items-center justify-between rounded-[12px]">
        {status === "pending" ? (
          <TouchableOpacity
            className="px-[16px] py-[8px] rounded-[12px] bg-[#F2F7F4] w[50%]"
            onPress={() => {
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success,
              );
              onMarkDone();
            }}
          >
            <Text className="font-bold">Đánh dấu xong</Text>
          </TouchableOpacity>
        ) : null}
        {status === "pending" ? (
          <View className="flex-row items-center justify-around gap-2 w-[50%]">
            <TouchableOpacity
              className="flex-row items-center gap-2 rounded-lg p-2"
              style={{ borderColor: Colors.brandorange, borderWidth: 2 }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onEdit();
              }}
            >
              <FontAwesome name="edit" size={24} color={Colors.brownearth} />
              <Text
                className="text-[14px] font-bold"
                style={{ color: Colors.brandorange }}
              >
                Sửa
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center gap-2 rounded-lg p-2"
              style={{ borderColor: Colors.brownearth, borderWidth: 2 }}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                onDelete();
              }}
            >
              <FontAwesome name="trash" size={24} color={Colors.brownearth} />
              <Text
                className="text-[14px] font-bold"
                style={{ color: Colors.brownearth }}
              >
                Xóa
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          null
        )}
      </View>
    </View>
  );
};
