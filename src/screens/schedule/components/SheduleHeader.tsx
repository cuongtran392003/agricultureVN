import { Colors } from "@/constant/Colors";
import { ICONS } from "assets/icons";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const ScheduleHeader = () => {
  const [now, setNow] = useState(dayjs());

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dateLabel = now.format("MMMM, YYYY");

  return (
    <View
      className="items-center justify-center h-[148px] rounded-b-[24px]"
      style={{ backgroundColor: Colors.forestgreen }}
    >
      <View className="flex-row justify-around items-center w-full">
        <TouchableOpacity onPress={() => router.navigate("/(tabs)/home" as any)}>
          <Image source={ICONS.iconBackWhite} />
        </TouchableOpacity>
        <Text className="font-bold text-white text-[20px]">Lịch chăm sóc</Text>
        <Image source={ICONS.iconBell} />
      </View>
      <Text className="text-white font-semibold text-[16px] mt-10">
        {dateLabel}
      </Text>
    </View>
  );
};
